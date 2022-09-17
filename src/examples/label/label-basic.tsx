import React from "react";
import { Window, Label } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestLabelBasic() {
	return (
		<Window title="Label Basic">
			<DemoLayout>
				<Label text="Label Basic"></Label>
			</DemoLayout>
		</Window>
	);
}
