import { Vec4 } from "ave-ui";
import React from "react";
import { Window, Button } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestButtonColor() {
	return (
		<Window title="Button Color">
			<DemoLayout>
				<Button text="Button" style={{ color: new Vec4(0, 146, 255, 255 * 0.75) }}></Button>
			</DemoLayout>
		</Window>
	);
}
