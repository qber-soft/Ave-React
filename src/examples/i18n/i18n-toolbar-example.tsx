import { App, CultureId, StringKey, ToolBarItemType, Vec4 } from "ave-ui";
import React, { useCallback, useRef } from "react";
import { Window, Toolbar, IToolbarComponentProps, IToolbarStyle, getAppContext, Button } from "../../ave-react";
import { DemoLayout } from "../common";
import { onInitI18n } from "./i18n-toolbar";

// id should start from non-zero value
enum FileMenuItem {
	New = 1,
	Open,
	Save,
	SaveAs,
}

enum OpenFileSubMenuItem {
	FileA = 1,
	FileB,
}

const toolbarItems: IToolbarComponentProps["items"] = [
	{
		type: ToolBarItemType.Menu,
		strKey: new StringKey("File", 0, 4),
		items: [
			{
				id: FileMenuItem.New,
			},
			{
				id: FileMenuItem.Open,
				strKey: new StringKey("OpenFile", 0, 2),
				subMenu: {
					children: [
						{
							id: OpenFileSubMenuItem.FileA,
						},
						{
							id: OpenFileSubMenuItem.FileB,
						},
					],
					onClick(sender, id) {
						const itemInfo = this.children.find((each) => each.id === id);
						console.log(`click file submenu item: ${JSON.stringify(itemInfo, null, 4)}`);
					},
				},
			},
			{
				id: FileMenuItem.Save,
			},
			{
				id: FileMenuItem.SaveAs,
			},
		],
		onClick(sender, id: FileMenuItem) {
			const itemInfo = this.items.find((each) => each.id === id);
			console.log(`click file menu item: ${JSON.stringify(itemInfo, null, 4)}`);
		},
	},
];

const toolbarStyle: IToolbarStyle = {
	textColor: new Vec4(255, 255, 255, 255 * 0.8),
};

const toolbarStrKey = new StringKey("Toolbar", 0, 1);

function onInit(app: App) {
	onInitI18n(app);
	const context = getAppContext();
	const i18n = context.getI18n();
	i18n.switch(CultureId.en_us);
	console.log("switch lang to en_us");
}

export function TestToolbarI18n() {
	const refLang = useRef(CultureId.en_us);
	const switchLang = useCallback(() => {
		console.log("switch lang");
		if (refLang.current === CultureId.en_us) {
			refLang.current = CultureId.zh_cn;
		} else if (refLang.current === CultureId.zh_cn) {
			refLang.current = CultureId.en_us;
		}
		const context = getAppContext();
		const i18n = context.getI18n();
		i18n.switch(refLang.current);
	}, []);

	return (
		<Window onInit={onInit}>
			<Toolbar strKey={toolbarStrKey} items={toolbarItems} style={toolbarStyle} />
			<DemoLayout>
				<Button text="Switch Lang" onClick={switchLang}></Button>
			</DemoLayout>
		</Window>
	);
}
