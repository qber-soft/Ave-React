import { IPlaceholder, IPainter, Rect, Vec4, Byo2Image, DrawImageFilter, DrawImageFlag, DrawImageParam, Vec2 } from "ave-ui";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Window, IPlaceholderComponentProps, Placeholder, Grid, Pager, IImageComponentProps, Image } from "../../ave-react";
import { assetsPath } from "../common";

export function TestZoomView() {
	const [image, setImage] = useState<Byo2Image>();
	const [pixelPos, setPixelPos] = useState<Vec2>();

	const onLoad = useCallback<IImageComponentProps["onLoad"]>((byo2) => {
		setImage(byo2);
	}, []);

	const onPointerMove = useCallback<IImageComponentProps["onPointerMove"]>((sender, mp) => {
		setPixelPos(mp.Position);
	}, []);

	return (
		<Window title="Zoom View">
			<DemoLayout>
				<Pager>
					<Image src={assetsPath("wallpaper.png")} onLoad={onLoad} onPointerMove={onPointerMove} />
				</Pager>
				<ZoomView image={image} pixelPos={pixelPos} />
			</DemoLayout>
		</Window>
	);
}

function DemoLayout(props: { children?: any[] }) {
	const demoLayout = {
		columns: `1 200dpx`,
		rows: `200dpx 1`,
		areas: {
			left: { row: 0, column: 0, columnSpan: 1, rowSpan: 2 },
			right: { row: 0, column: 1 },
		},
	};
	return (
		<Grid style={{ layout: demoLayout }}>
			<Grid style={{ area: demoLayout.areas.left }}>{props.children[0]}</Grid>
			<Grid style={{ area: demoLayout.areas.right }}>{props.children[1]}</Grid>
		</Grid>
	);
}

interface IZoomViewProps {
	image: Byo2Image;
	pixelPos: Vec2;
}

const dip = new DrawImageParam();
dip.Filter = DrawImageFilter.Point;

function ZoomView(props: IZoomViewProps) {
	const refPixelPos = useRef<Vec2>();
	const refImage = useRef<Byo2Image>();

	useEffect(() => {
		refImage.current = props.image;
		refPixelPos.current = props.pixelPos;
	}, [props]);

	const onPaintPost = useCallback<IPlaceholderComponentProps["onPaintPost"]>((sender: IPlaceholder, painter: IPainter, rc: Rect) => {
		const image = refImage.current;
		const pixelPos = refPixelPos.current;

		if (!image || !pixelPos) {
			return;
		}

		const width = image.GetWidth();
		const height = image.GetHeight();

		const blockSize = rc.w / 9;
		if (pixelPos.x >= 0 && pixelPos.y >= 0 && pixelPos.x < width && pixelPos.y < height) {
			const v = Vec2.Zero;
			dip.SourceRect.x = pixelPos.x - 4;
			dip.SourceRect.y = pixelPos.y - 4;
			dip.SourceRect.w = 9;
			dip.SourceRect.h = 9;
			dip.TargetSize.x = rc.w;
			dip.TargetSize.y = rc.h;
			if (dip.SourceRect.x < 0) {
				v.x -= blockSize * dip.SourceRect.x;
				dip.SourceRect.x = 0;
			}
			if (dip.SourceRect.y < 0) {
				v.y -= blockSize * dip.SourceRect.y;
				dip.SourceRect.y = 0;
			}
			if (dip.SourceRect.Right >= width) dip.SourceRect.w = width - dip.SourceRect.x;
			if (dip.SourceRect.Bottom >= height) dip.SourceRect.h = height - dip.SourceRect.y;
			dip.TargetSize.x = dip.SourceRect.w * blockSize;
			dip.TargetSize.y = dip.SourceRect.h * blockSize;
			painter.DrawImageEx(image, v, DrawImageFlag.TargetSize | DrawImageFlag.SourceRect | DrawImageFlag.Filter, dip);
		}
		painter.SetPenColor(new Vec4(0, 0, 0, 255));
		painter.DrawRectangle(rc.x, rc.y, rc.w, rc.h);
		painter.DrawRectangle((rc.w - blockSize) * 0.5, (rc.h - blockSize) * 0.5, blockSize, blockSize);
		painter.SetPenColor(new Vec4(255, 255, 255, 255));
		painter.DrawRectangle((rc.w - blockSize) * 0.5 - 1, (rc.h - blockSize) * 0.5 - 1, blockSize + 2, blockSize + 2);
	}, []);

	return <Placeholder onPaintPost={onPaintPost} />;
}
