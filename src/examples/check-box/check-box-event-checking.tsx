import { CheckValue } from "ave-ui";
import React from "react";
import { Window, CheckBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestCheckBoxOnChecking() {
	return (
		<Window title="CheckBox onChecking">
			<DemoLayout>
				<CheckBox
					text="Apple"
					onCheck={(sender) => {
						const checkValue = sender.GetValue();
						console.log(`check value: ${checkValue}(${CheckValue[checkValue]})`);
					}}
					onChecking={(sender) => {
						return false;
					}}
				></CheckBox>
			</DemoLayout>
		</Window>
	);
}
