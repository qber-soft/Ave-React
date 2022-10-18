import { CheckValue } from "ave-ui";
import React from "react";
import { Window, CheckBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestCheckBoxValue() {
	return (
		<Window title="CheckBox Value">
			<DemoLayout>
				<CheckBox text="Apple" value={CheckValue.Checked}></CheckBox>
			</DemoLayout>
		</Window>
	);
}
