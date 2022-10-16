import { Vec4 } from "ave-ui";
import React from "react";
import { Window, CheckBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestCheckBoxColor() {
	return (
		<Window title="CheckBox Color">
			<DemoLayout>
				<CheckBox text="Apple" style={{ color: new Vec4(0, 146, 255, 255 * 0.75) }}></CheckBox>
			</DemoLayout>
		</Window>
	);
}
