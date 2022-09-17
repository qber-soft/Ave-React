import React from "react";
import { Window, TextBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestTextBoxBasic() {
	return (
		<Window title="TextBox Basic">
			<DemoLayout>
				<TextBox text="TextBox Basic"></TextBox>
			</DemoLayout>
		</Window>
	);
}
