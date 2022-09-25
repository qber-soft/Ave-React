import { App, CultureId } from "ave-ui";
import { getAppContext, Ii18n, ILangBase } from "../../ave-react";

export interface ILang extends ILangBase {
	// ave built-in language key
    AppTitle: string;

    // user defined key
    SwitchLang: string;
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
			app.LangSetDefaultString(id, this.lang[id]);
			app.LangSetCurrent(id);
		},
		lang: {
			[CultureId.en_us]: {
				// ave built-in language key
				__FontStd: "Segoe UI",
				AppTitle: 'My App',

				// user defined key
				SwitchLang: 'Switch Lang',
			},
			[CultureId.zh_cn]: {
				__FontStd: "Microsoft YaHei UI",
				AppTitle: '我的应用',

				SwitchLang: '切换语言'
			},
		},
	};

	const context = getAppContext();
	context.setI18n(i18n);
}
