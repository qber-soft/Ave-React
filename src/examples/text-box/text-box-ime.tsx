import React from "react";
import { Window, TextBox, Grid } from "../../ave-react";

export function TestTextBoxIme() {
	return (
		<Window title="TextBox Ime">
			<DemoLayout>
				<TextBox></TextBox>
				<TextBox ime></TextBox>
			</DemoLayout>
		</Window>
	);
}



function DemoLayout(props: { children?: any[] }) {
	const demoLayout = {
		columns: `1 120dpx 120dpx 120dpx 1`,
		rows: `1 32dpx 1`,
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