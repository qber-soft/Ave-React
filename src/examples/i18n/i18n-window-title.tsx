import { App, CultureId } from "ave-ui";
import React from "react";
import { getAppContext, Window } from "../../ave-react";
import { onInitI18n } from "./i18n-title";

function onInit(app: App) {
	onInitI18n(app);
	const context = getAppContext();
	const i18n = context.getI18n();
	i18n.switch(CultureId.en_us);
	console.log("switch lang to en_us");
}

export function TestI18nWindowTitle() {
	return <Window onInit={onInit} />;
}
