import { Vec4 } from "ave-ui";
import React from "react";
import { Window, Label, Grid } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestLabelSetText() {
	return (
		<Window title="Label SetText">
			<DemoLayout>
				<Grid style={{ backgroundColor: new Vec4(0, 146, 255, 255 * 0.75) }}>
					<Label text="Label"></Label>
				</Grid>
			</DemoLayout>
		</Window>
	);
}
