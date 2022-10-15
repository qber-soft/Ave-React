import { Vec4 } from "ave-ui";
import React from "react";
import { Window, Label } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestLabelBackgroundColor() {
	return (
		<Window title="Label Background Color">
			<DemoLayout>
				<Label text="Label" style={{ backgroundColor: new Vec4(0, 146, 255, 255 * 0.75) }}></Label>
			</DemoLayout>
		</Window>
	);
}
