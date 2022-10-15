import { AlignType, Vec4 } from "ave-ui";
import React from "react";
import { Window, Label } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestLabelTextColor() {
	return (
		<Window title="Label Text Color">
			<DemoLayout>
				<Label text="Label" style={{ horizontalAlign: AlignType.Center, backgroundColor: new Vec4(0, 146, 255, 255 * 0.75), color: new Vec4(255, 255, 255, 255) }}></Label>
			</DemoLayout>
		</Window>
	);
}
