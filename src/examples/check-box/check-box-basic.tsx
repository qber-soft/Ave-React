import React from "react";
import { Window, CheckBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestCheckBoxBasic() {
	return (
		<Window title="CheckBox Basic">
			<DemoLayout>
				<CheckBox text="Apple"></CheckBox>
			</DemoLayout>
		</Window>
	);
}
