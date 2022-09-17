import React from "react";
import { Window, Button, Grid } from "../../ave-react";

export function TestButtonBasic2() {
	return (
		<Window title="Button Basic 2">
			<DemoLayout>
				<Button text="Button A"></Button>
				<Button text="Button B"></Button>
			</DemoLayout>
		</Window>
	);
}

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
