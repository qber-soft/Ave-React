import { ButtonStyle } from "ave-ui";
import React from "react";
import { Window, Button, Grid } from "../../ave-react";

export function TestButtonStyle() {
	return (
		<Window title="Button Style">
			<DemoLayout>
				<Button text="Button" style={{ visualStyle: ButtonStyle.Command }}></Button>
				<Button text="Button" style={{ visualStyle: ButtonStyle.Push }}></Button>
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
		columns: `1 ${width} ${width} ${width} 1`,
		rows: `1 ${height} 1`,
		areas: {
			left: { row: 1, column: 1 },
			right: { row: 1, column: 3 },
		},
	};
	const [left, right] = props.children;
	return (
		<Grid style={{ layout: demoLayout }}>
			<Grid style={{ area: demoLayout.areas.left }}>{left}</Grid>
			<Grid style={{ area: demoLayout.areas.right }}>{right}</Grid>
		</Grid>
	);
}
