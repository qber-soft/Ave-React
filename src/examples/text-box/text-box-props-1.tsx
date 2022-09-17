import React from "react";
import { Window, TextBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestTextBoxProps1() {
	return (
		<Window title="TextBox Props 1">
			<DemoLayout>
				<TextBox text="Readonly & No Border" readonly border={false}></TextBox>
			</DemoLayout>
		</Window>
	);
}
