import { IPainter, IPlaceholder, Vec4, Rect, DrawTextFlag, FontDescription, Byo2Font } from "ave-ui";
import React, { useCallback, useState } from "react";
import { Window, Placeholder, IPlaceholderComponentProps, getAppContext } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestPlaceholderCustomButton() {
	return (
		<Window title="Placeholder Custom Button">
			<DemoLayout>
				<Button text="Primary Button" />
			</DemoLayout>
		</Window>
	);
}

interface IButtonStyle {
	border: {
		radius: number;
	};
	color: Vec4;
	backgroundColor: Vec4;
	font: {
		size: number;
		family: string[];
	};
}

interface IButtonProps {
	text: string;
	style?: IButtonStyle;
}

const colors = {
	normal: new Vec4(24, 144, 255, 255),
	hover: new Vec4(64, 169, 255, 255),
	active: new Vec4(9, 109, 217, 255),
	white: new Vec4(255, 255, 255, 255),
};

const defaultButtonStyle = {
	border: {
		radius: 3,
	},
	color: colors.white,
	backgroundColor: colors.normal,
	font: {
		size: 9,
		family: ["Segoe UI", "Microsoft YaHei UI", "Meiryo UI", "SimSun-ExtB"],
	},
};

function Button(props: IButtonProps) {
	const [style, setStyle] = useState(props.style ?? defaultButtonStyle);
	const text = props.text ?? "Button";

	const [isEntered, setIsEntered] = useState(false);
	const [isPressed, setIsPressed] = useState(false);

	const onPaintPost = useCallback<IPlaceholderComponentProps["onPaintPost"]>(
		(sender: IPlaceholder, painter: IPainter, rect: Rect) => {
			const { border, color, backgroundColor, font: fontStyle } = style;

			const fontDesc = new FontDescription();
			fontDesc.Name = fontStyle.family;
			fontDesc.Size = fontStyle.size;

			const context = getAppContext();
			const window = context.getWindow();
			const font = new Byo2Font(window, fontDesc);

			painter.SetFillColor(backgroundColor);
			painter.FillRoundedRectangle(rect.x, rect.y, rect.w, rect.h, border.radius, border.radius);
			painter.SetTextColor(color);
			painter.DrawString(font, rect, text, DrawTextFlag.Center | DrawTextFlag.VCenter, text.length);
		},
		[style, text]
	);

	const onPointerEnter = useCallback<IPlaceholderComponentProps["onPointerEnter"]>((sender: IPlaceholder) => {
		setIsEntered(true);
		setStyle({
			...style,
			backgroundColor: colors.hover,
		});
		sender.Redraw();
	}, []);

	const onPointerLeave = useCallback<IPlaceholderComponentProps["onPointerLeave"]>(
		(sender: IPlaceholder) => {
			setIsEntered(false);
			if (!isPressed) {
				setStyle({
					...style,
					backgroundColor: colors.normal,
				});
			}
			sender.Redraw();
		},
		[isPressed]
	);

	const onPointerPress = useCallback<IPlaceholderComponentProps["onPointerPress"]>((sender: IPlaceholder) => {
		setIsPressed(true);
		setStyle({
			...style,
			backgroundColor: colors.active,
		});
		sender.Redraw();
	}, []);

	const onPointerRelease = useCallback<IPlaceholderComponentProps["onPointerRelease"]>((sender: IPlaceholder) => {
		setIsPressed(false);
		setStyle({
			...style,
			backgroundColor: colors.normal,
		});
		sender.Redraw();
	}, []);

	return <Placeholder onPaintPost={onPaintPost} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onPointerPress={onPointerPress} onPointerRelease={onPointerRelease} />;
}
