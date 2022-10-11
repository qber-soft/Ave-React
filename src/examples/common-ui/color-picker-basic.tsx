import React from "react";
import { Window, Button, getAppContext } from "../../ave-react";
import { DemoLayout } from "../common";
import { Vec4 } from "ave-ui";

export function TestColorPickerBasic() {
	return (
		<Window title="ColorPicker Basic">
			<DemoLayout>
				<Button
					text="Button"
					onClick={async (sender) => {
						const context = getAppContext();
						const window = context.getWindow();

						const commonUi = window.GetCommonUi();
						const result = await commonUi.PickColor(new Vec4(255, 255, 255, 255), false);
						sender.SetTextColor(result);
					}}
				></Button>
			</DemoLayout>
		</Window>
	);
}
