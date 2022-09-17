import React from "react";
import { Grid } from "../../ave-react";

export interface IDemoLayoutProps {
	children?: any[] | any;
	width?: string;
	height?: string;
}

export function DemoLayout(props: IDemoLayoutProps) {
	const width = props?.width ?? "120dpx";
	const height = props?.height ?? "32dpx";

	const demoLayout = {
		columns: `1 ${width} 1`,
		rows: `1 ${height} 1`,
		areas: {
			center: { row: 1, column: 1 },
		},
	};
	return (
		<Grid style={{ layout: demoLayout }}>
			<Grid style={{ area: demoLayout.areas.center }}>{props.children}</Grid>
		</Grid>
	);
}
