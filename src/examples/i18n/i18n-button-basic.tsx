import { App, CultureId } from "ave-ui";
import React from "react";
import { Window, Button, getAppContext } from "../../ave-react";
import { DemoLayout } from "../common";
import { onInitI18n } from "./i18n-button";

function onInit(app: App) {
	onInitI18n(app);
	const context = getAppContext();
	const i18n = context.getI18n();
	i18n.switch(CultureId.en_us);
	console.log("switch lang to en_us");
}

export function TestI18nButtonBasic() {
	return (
		<Window title="i18n Button Basic" onInit={onInit}>
			<DemoLayout>
				<Button text="Button" langKey="Button"></Button>
			</DemoLayout>
		</Window>
	);
}
