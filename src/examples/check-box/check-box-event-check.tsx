import { CheckValue } from "ave-ui";
import React from "react";
import { Window, CheckBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestCheckBoxOnCheck() {
	return (
		<Window title="CheckBox onCheck">
			<DemoLayout>
				<CheckBox
					text="Apple"
					onCheck={(sender) => {
						const checkValue = sender.GetValue();
						console.log(`check value: ${checkValue}(${CheckValue[checkValue]})`);
					}}
				></CheckBox>
			</DemoLayout>
		</Window>
	);
}
