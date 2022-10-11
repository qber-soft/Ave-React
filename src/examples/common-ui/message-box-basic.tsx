import { MessageButton, MessageIcon, MessageResult } from "ave-ui";
import React from "react";
import { Window, Button, getAppContext } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestMessageBoxBasic() {
	return (
		<Window title="MessageBox Basic">
			<DemoLayout>
				<Button
					text="Button"
					onClick={async () => {
						const context = getAppContext();
						const window = context.getWindow();

						const commonUi = window.GetCommonUi();
						const result = await commonUi.Message("Message", "This is a message", MessageIcon.Infomation, MessageButton.YesNo, "Title");
						console.log(`message result: ${result}(${MessageResult[result]})`);
					}}
				></Button>
			</DemoLayout>
		</Window>
	);
}
