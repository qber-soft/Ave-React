import React from "react";
import { Window, Button, getAppContext } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestInputBasic() {
	return (
		<Window title="Input Basic">
			<DemoLayout>
				<Button
					text="Button"
					onClick={async () => {
						const context = getAppContext();
						const window = context.getWindow();

						const commonUi = window.GetCommonUi();
						const label = "Please input:";
						const placeHolder = "input here";
						const title = "Title";
						const value = "default input";
						const fallback = "input cancelled";
						const result = await commonUi.Input(fallback, label, value, placeHolder, title);
						console.log(`input result: "${result}"`);
					}}
				></Button>
			</DemoLayout>
		</Window>
	);
}
