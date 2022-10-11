import { App, CultureId } from "ave-ui";
import { getAppContext, Ii18n, ILangBase, DefaultString } from "../../ave-react";

export interface ILang extends ILangBase {
	["Button.Basic"]: string;
}

export function onInitI18n(app: App) {
	const i18n: Ii18n<ILang> = {
		t(key, toReplace: object = {}) {
			let result = app.LangGetString(key);
			Object.keys(toReplace).forEach((each) => {
				result = result.replace(`{{${each}}}`, toReplace[each]);
			});
			return result;
		},
		switch(this: Ii18n, id) {
			app.LangSetDefaultString(id, {
				...DefaultString,
				...this.lang[id],
			});
			app.LangSetCurrent(id);
		},
		lang: {
			[CultureId.en_us]: {
				// ave built-in language key
				__FontStd: "Segoe UI",

				// user defined key
				...(flattenLanguageConfig({
					Button: {
						Basic: "Basic Button",
					},
				}) as any),
			},
			[CultureId.zh_cn]: {
				__FontStd: "Microsoft YaHei UI",

				...(flattenLanguageConfig({
					Button: {
						Basic: "基本按钮",
					},
				}) as any),
			},
		},
	};

	const context = getAppContext();
	context.setI18n(i18n);
}

function flattenLanguageConfig(config: object) {
	const result = {};

	JSON.stringify(
		config,
		replacerWithPath((field: any, value: any, path: string) => {
			if (path.includes(".")) {
				result[path] = value;
			}
			return value;
		})
	);

	return result;
}

// https://stackoverflow.com/a/61693085
function replacerWithPath(replacer: any) {
	let m = new Map();

	return function (field, value) {
		let path = m.get(this) + (Array.isArray(this) ? `[${field}]` : "." + field);
		if (value === Object(value)) m.set(value, path);
		return replacer.call(this, field, value, path.replace(/undefined\.\.?/, ""));
	};
}
