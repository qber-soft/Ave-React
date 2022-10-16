import { CheckBoxStyle } from "ave-ui";
import React from "react";
import { Window, CheckBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestCheckBoxStyle() {
	return (
		<Window title="CheckBox Style">
			<DemoLayout>
				<CheckBox
					text="Apple"
					style={{
						visualStyle: CheckBoxStyle.Pushing,
					}}
				></CheckBox>
			</DemoLayout>
		</Window>
	);
}
