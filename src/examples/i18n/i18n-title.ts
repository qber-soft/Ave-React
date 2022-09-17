import { App, CultureId } from "ave-ui";
import { getAppContext, Ii18n, ILangBase } from "../../ave-react";

export interface ILang extends ILangBase {
	Temp: string;
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
				AppTitle: "Test Window Title",
				__FontStd: "Segoe UI",

				// user defined key
				Temp: "Temp",
			},
			[CultureId.zh_cn]: {
				AppTitle: "测试窗口标题",
				__FontStd: "Microsoft YaHei UI",

				Temp: "临时",
			},
		},
	};

	const context = getAppContext();
	context.setI18n(i18n);
}
