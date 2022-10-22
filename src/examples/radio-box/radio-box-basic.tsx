import React from "react";
import { Window, RadioBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestRadioBoxBasic() {
	return (
		<Window title="RadioBox Basic">
			<DemoLayout>
				<RadioBox text="Option A"></RadioBox>
			</DemoLayout>
		</Window>
	);
}
