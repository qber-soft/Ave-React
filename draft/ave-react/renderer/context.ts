import { App, CultureId, ThemeImage, ThemePredefined_Dark, Window } from "ave-ui";

export interface IIconResource {
	size: number[];
	path: Record<string, string[]>;
}

export interface ILangBase {
	// ave built-in language key
	AppTitle?: string;
	CoOk?: string;
	__FontStd?: string;

	// user defined key
	// ...
}

export type KeyOfLang = keyof ILangBase;

export interface Ii18n<LangType extends ILangBase = ILangBase> {
	t(key: keyof LangType, toReplace?: object): string;
	switch(id: CultureId): void;
	lang: Partial<Record<CultureId, LangType>>;
}

export class AppContext {
	private iconResourceMap: Record<string, number>;
	private iconResource: IIconResource;
	private i18n: Ii18n;
	private themeImage: ThemeImage;
	private themeDark: ThemePredefined_Dark;
	private aveApp: App;
	private window: Window;

	setWindow(window: Window) {
		this.window = window;
	}

	getWindow() {
		return this.window;
	}

	setAveApp(app: App) {
		this.aveApp = app;
	}

	getAveApp() {
		return this.aveApp;
	}

	get imageCodec() {
		return this.getAveApp().GetImageCodec();
	}

	setThemeDark(themeDark: ThemePredefined_Dark) {
		this.themeDark = themeDark;
	}

	getThemeDark() {
		return this.themeDark;
	}

	setThemeImage(theme: ThemeImage) {
		this.themeImage = theme;
	}

	getThemeImage() {
		return this.themeImage;
	}

	setI18n(i18n: Ii18n) {
		this.i18n = i18n;
	}

	getI18n() {
		return this.i18n;
	}

	setIconResource(res: IIconResource) {
		this.iconResource = res;
	}

	getIconResource() {
		return this.iconResource ?? { size: [], path: {} };
	}

	setIconResourceMap(resMap: Record<string, number>) {
		this.iconResourceMap = resMap;
	}

	getIconResourceMap<T extends Record<string, number>>(): T {
		return (this.iconResourceMap ?? {}) as unknown as T;
	}
}
