import { App, CultureId } from "ave-ui";
import React, { useState } from "react";
import { Window, Button, getAppContext, IButtonComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";
import { onInitI18n } from "./i18n-switch";

function onInit(app: App) {
	onInitI18n(app);
	const context = getAppContext();
	const i18n = context.getI18n();
	i18n.switch(CultureId.en_us);
}

export function TestI18nButtonSwitch() {
	const [currentLang, setCurrentLang] = useState<CultureId>(CultureId.en_us);

	const onSwitchLang: IButtonComponentProps["onClick"] = () => {
		const context = getAppContext();
		const i18n = context.getI18n();
		if (currentLang === CultureId.en_us) {
			setCurrentLang(CultureId.zh_cn);
			i18n.switch(CultureId.zh_cn);
		} else if (currentLang === CultureId.zh_cn) {
			setCurrentLang(CultureId.en_us);
			i18n.switch(CultureId.en_us);
		}
	};

	return (
		<Window onInit={onInit}>
			<DemoLayout>
				<Button langKey="SwitchLang" onClick={onSwitchLang}></Button>
			</DemoLayout>
		</Window>
	);
}
