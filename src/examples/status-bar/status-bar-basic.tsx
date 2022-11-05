import React from "react";
import { Window, StatusBar, Grid, IStatusBarComponentProps } from "../../ave-react";

export function TestStatusBarBasic() {
	// prettier-ignore
	const parts: IStatusBarComponentProps["parts"] = [
		{ size: "120dpx", text: "feature/status-bar", clickable: true }, 
		{ size: "100dpx", text: "Git Graph", clickable: true }, 
		{ size: "1" }
	];

	return (
		<Window title="StatusBar Basic">
			<DemoLayout>
				<StatusBar
					parts={parts}
					onClick={(sender, index) => {
						console.log(`index: ${index}`);
					}}
				></StatusBar>
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
	const height = props?.height ?? "32dpx";

	const demoLayout = {
		columns: `1`,
		rows: `1 ${height}`,
		areas: {
			control: { row: 1, column: 0 },
		},
	};
	return (
		<Grid style={{ layout: demoLayout }}>
			<Grid style={{ area: demoLayout.areas.control }}>{props.children}</Grid>
		</Grid>
	);
}
