import React, { useState } from "react";
import { Window, Button, getAppContext } from "../../ave-react";
import { DemoLayout } from "../common";
import { Vec4 } from "ave-ui";

export function TestColorPickerBasic2() {
	const [color, setColor] = useState(new Vec4(255, 255, 255, 255));

	return (
		<Window title="ColorPicker Basic 2">
			<DemoLayout>
				<Button
					text="Button"
					onClick={async (sender) => {
						const context = getAppContext();
						const window = context.getWindow();

                        const commonUi = window.GetCommonUi();
                        const result = await commonUi.PickColor(color, false);
                        sender.SetTextColor(result);
						setColor(result);
					}}
				></Button>
			</DemoLayout>
		</Window>
	);
}
