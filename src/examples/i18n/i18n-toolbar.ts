import { App, CultureId } from "ave-ui";
import { DefaultString, getAppContext, Ii18n, ILangBase } from "../../ave-react";

export interface ILang extends ILangBase {
	Toolbar0: string;
	File0: string;
	File1: string;
	File2: string;
	File3: string;
	OpenFile0: string;
	OpenFile1: string;
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
				...this.lang[id]
			});
			app.LangSetCurrent(id);
		},
		lang: {
			[CultureId.en_us]: {
				// ave built-in language key
				AppTitle: "Test Toolbar i18n",
				__FontStd: "Segoe UI",

				// user defined key
				Toolbar0: "FILE",

				File0: "New File",
				File1: "Open File",
				File2: "Save File",
				File3: "Save File As",

				OpenFile0: "Open File A",
				OpenFile1: "Open File B",
			},
			[CultureId.zh_cn]: {
				AppTitle: "测试 Toolbar i18n",
				__FontStd: "Microsoft YaHei UI",

				Toolbar0: "文件",

				File0: "新建文件",
				File1: "打开文件",
				File2: "保存文件",
				File3: "另存为",

				OpenFile0: "打开文件 A",
				OpenFile1: "打开文件 B",
			},
		},
	};

	const context = getAppContext();
	context.setI18n(i18n);
}
