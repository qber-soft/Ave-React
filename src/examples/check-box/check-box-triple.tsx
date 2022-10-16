import React from "react";
import { Window, CheckBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestCheckBoxTriple() {
	return (
		<Window title="CheckBox Triple">
			<DemoLayout>
				<CheckBox text="Apple" triple></CheckBox>
			</DemoLayout>
		</Window>
	);
}
