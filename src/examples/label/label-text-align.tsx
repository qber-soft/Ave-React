import { AlignType, Vec4 } from "ave-ui";
import React from "react";
import { Grid, Window, Label } from "../../ave-react";

export function TestLabelTextAlign() {
	const backgroundColor = new Vec4(0, 146, 255, 255 * 0.75);
	return (
		<Window title="Label Text Align">
			<DemoLayout>
				<Label text="Label" style={{ backgroundColor, horizontalAlign: AlignType.Near }}></Label>
				<Label text="Label" style={{ backgroundColor, horizontalAlign: AlignType.Center }}></Label>
				<Label text="Label" style={{ backgroundColor, horizontalAlign: AlignType.Far }}></Label>
			</DemoLayout>
		</Window>
	);
}

interface IDemoLayoutProps {
	children?: any[] | any;
	width?: string;
	height?: string;
}

function DemoLayout(props: IDemoLayoutProps) {
	const width = props?.width ?? "120dpx";
	const height = props?.height ?? "32dpx";

	const demoLayout = {
		columns: `1 ${width} ${width} ${width} ${width} ${width} 1`,
		rows: `1 ${height} 1`,
		areas: {
			left: { row: 1, column: 1 },
			middle: { row: 1, column: 3 },
			right: { row: 1, column: 5 },
		},
	};
	const [left, middle, right] = props.children;

	return (
		<Grid style={{ layout: demoLayout }}>
			<Grid style={{ area: demoLayout.areas.left }}>{left}</Grid>
			<Grid style={{ area: demoLayout.areas.middle }}>{middle}</Grid>
			<Grid style={{ area: demoLayout.areas.right }}>{right}</Grid>
		</Grid>
	);
}
