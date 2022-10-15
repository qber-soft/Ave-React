import React from "react";
import { Window, TextBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestTextBoxOnChange() {
	return (
		<Window title="TextBox onChange">
			<DemoLayout>
				<TextBox
					onChange={(sender, reason) => {
						console.log(reason);
						console.log(sender.GetText());
					}}
				></TextBox>
			</DemoLayout>
		</Window>
	);
}
