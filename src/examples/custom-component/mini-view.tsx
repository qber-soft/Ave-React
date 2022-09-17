import { IPlaceholder, IPainter, Rect, Vec4, Byo2Image, DrawImageFlag, DrawImageParam, DrawImageFilter, Pager as NativePager, Vec2, InputModifier, PointerButton } from "ave-ui";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Window, Placeholder, IPlaceholderComponentProps, Grid, IImageComponentProps, Pager, IPagerComponentProps, getAppContext } from "../../ave-react";
import { assetsPath } from "../common";

export function TestMiniView() {
	const [image, setImage] = useState<Byo2Image>();
	const [pager, setPager] = useState<NativePager>();

	const onLoad = useCallback<IImageComponentProps["onLoad"]>((byo2) => {
		setImage(byo2);
	}, []);

	const onSetContent = useCallback<IPagerComponentProps["onSetContent"]>((pager) => {
		setPager(pager);
	}, []);

	return (
		<Window title="Mini View">
			<DemoLayout>
				<Pager onSetContent={onSetContent}>
					<Image src={assetsPath("wallpaper.png")} onLoad={onLoad} />
				</Pager>
				<MiniView image={image} pager={pager} />
			</DemoLayout>
		</Window>
	);
}

//
function DemoLayout(props: { children?: any[] }) {
	const demoLayout = {
		columns: `1 300dpx 50dpx 300dpx 1`,
		rows: `1 300dpx 1`,
		areas: {
			left: { row: 1, column: 1 },
			right: { row: 1, column: 3 },
		},
	};
	return (
		<Grid style={{ layout: demoLayout }}>
			<Grid style={{ area: demoLayout.areas.left }}>{props.children[0]}</Grid>
			<Grid style={{ area: demoLayout.areas.right }}>{props.children[1]}</Grid>
		</Grid>
	);
}

//
const dip = new DrawImageParam();
dip.Filter = DrawImageFilter.Point;

interface IMiniViewProps {
	image: Byo2Image;
	pager: NativePager;
}

function MiniView(props: IMiniViewProps) {
	const refImage = useRef<Byo2Image>();
	const refPager = useRef<NativePager>();

	useEffect(() => {
		refImage.current = props.image;
		refPager.current = props.pager;
	}, [props]);

	const onPaintPost = useCallback<IPlaceholderComponentProps["onPaintPost"]>((sender: IPlaceholder, painter: IPainter, rc: Rect) => {
		//
		const image = refImage.current;

		if (!image) {
			return;
		}

		const width = image.GetWidth();
		const height = image.GetHeight();

		const rcImage = new Rect(0, 0, width, height);
		const rcContainer = new Rect(rc.x, rc.y, rc.w, rc.h);
		rcImage.UniformScale(rcContainer);
		dip.TargetSize.x = rcImage.w;
		dip.TargetSize.y = rcImage.h;
		painter.DrawImageEx(image, rcImage.Position, DrawImageFlag.TargetSize, dip);
		painter.SetPenColor(new Vec4(0, 0, 0, 255));

		//
		const pager = refPager.current;
		if (!pager) {
			return;
		}

		const sm = pager.GetScrollMax();
		const sp = pager.GetScrollPosition();
		const rcp = pager.GetRectClient();
		if (sm.x > 0 || sm.y > 0) {
			const rcv = new Rect(0, 0, 1, 1);
			if (sm.x > 0) {
				rcv.x = -sp.x / sm.x;
				rcv.w = rcp.w / sm.x;
			}
			if (sm.y > 0) {
				rcv.y = -sp.y / sm.y;
				rcv.h = rcp.h / sm.y;
			}
			rcv.x = rcv.x * rcImage.w + rcImage.x;
			rcv.w *= rcImage.w;
			rcv.y = rcv.y * rcImage.h + rcImage.y;
			rcv.h *= rcImage.h;
			painter.SetPenColor(new Vec4(255, 255, 255, 255));
			painter.DrawRectangle(rcv.x - 1, rcv.y - 1, rcv.w + 2, rcv.h + 2);
			painter.SetPenColor(new Vec4(0, 0, 0, 255));
			painter.DrawRectangle(rcv.x, rcv.y, rcv.w, rcv.h);
		}
		painter.DrawRectangle(rc.x, rc.y, rc.w, rc.h);
	}, []);

	const moveMiniView = useCallback((v: Vec2, view: IPlaceholder) => {
		const image = refImage.current;
		const pager = refPager.current;

		if (!image || !pager) {
			return;
		}

		const context = getAppContext();
		const window = context.getWindow();

		const width = image.GetWidth();
		const height = image.GetHeight();

		const sm = pager.GetScrollMax();
		const rc = view.GetRectClient();
		const rcp = pager.GetRectClient();
		if (sm.x > 0 || sm.y > 0) {
			const rcImage = new Rect(0, 0, width, height);
			rcImage.UniformScale(rc);
			const vPos = Vec2.Zero;
			if (width > rc.w) vPos.x = -Math.max(0, ((v.x - rcImage.x) / rcImage.w) * sm.x - rcp.w * 0.5);
			if (height > rc.h) vPos.y = -Math.max(0, ((v.y - rcImage.y) / rcImage.h) * sm.y - rcp.h * 0.5);
			pager.SetScrollPosition(vPos, false);
			window.Update();
		}
	}, []);

	const onPointerMove = useCallback<IPlaceholderComponentProps["onPointerMove"]>((sender: IPlaceholder, mp) => {
		if (InputModifier.Button1 & mp.Modifier) moveMiniView(mp.Position, sender);
	}, []);

	const onPointerPress = useCallback<IPlaceholderComponentProps["onPointerPress"]>((sender: IPlaceholder, mp) => {
		if (PointerButton.First == mp.Button) moveMiniView(mp.Position, sender);
	}, []);

	return <Placeholder onPaintPost={onPaintPost} onPointerMove={onPointerMove} onPointerPress={onPointerPress} />;
}
