import { Vec4 } from "ave-ui";
import React from "react";
import { Window, Tab, Grid } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestTabGrid() {
	return (
		<Window title="Tab Grid">
			<DemoLayout width="300dpx" height="150dpx">
				<Tab
					items={[
						{ id: 1, name: "tab1" },
						{ id: 2, name: "tab2" },
					]}
				>
					<Grid style={{ backgroundColor: new Vec4(0, 146, 255, 255 * 0.75) }}></Grid>
					<Grid style={{ backgroundColor: new Vec4(238, 39, 70, 255) }}></Grid>
				</Tab>
			</DemoLayout>
		</Window>
	);
}
