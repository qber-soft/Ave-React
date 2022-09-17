import React from "react";
import { Window, Button } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestButtonBasic() {
	return (
		<Window title="Button Basic">
			<DemoLayout>
				<Button text="Button"></Button>
			</DemoLayout>
		</Window>
	);
}
