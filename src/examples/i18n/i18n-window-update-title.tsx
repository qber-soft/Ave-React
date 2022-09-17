import { App, CultureId } from "ave-ui";
import React, { useEffect } from "react";
import { getAppContext, Window } from "../../ave-react";
import { onInitI18n } from "./i18n-title";

function onInit(app: App) {
	onInitI18n(app);
	const context = getAppContext();
	const i18n = context.getI18n();
	i18n.switch(CultureId.en_us);
	console.log("switch lang to en_us");
}

function onLanguageChange(app: App) {
	// FIXME: this is invoked only once
	console.log(`lang change to`, CultureId[app.LangGetCurrent()]);
}

export function TestI18nWindowUpdateTitle() {
	useEffect(() => {
		setTimeout(() => {
			const context = getAppContext();
			const i18n = context.getI18n();
			i18n.switch(CultureId.zh_cn);
			console.log("switch lang to zh_cn");
		}, 3000);
	}, []);
	return <Window onInit={onInit} onLanguageChange={onLanguageChange} />;
}
