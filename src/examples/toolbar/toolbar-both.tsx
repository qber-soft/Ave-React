import { ToolBarItemType, Vec4 } from "ave-ui";
import React from "react";
import { Window, Toolbar, Grid, IToolbarComponentProps, IToolbarStyle } from "../../ave-react";

// id should start from non-zero value
enum FileMenuItem {
	New = 1,
	Open,
	Save,
	SaveAs,
}

const leftToolbarItems: IToolbarComponentProps["items"] = [
	{
		type: ToolBarItemType.Menu,
		name: "File",
		items: [
			{
				id: FileMenuItem.New,
				name: "New File",
			},
			{
				id: FileMenuItem.Open,
				name: "Open File",
			},
			{
				id: FileMenuItem.Save,
				name: "Save File",
			},
			{
				id: FileMenuItem.SaveAs,
				name: "Save File As",
			},
		],
		onClick(sender, id: FileMenuItem) {
			const itemInfo = this.items.find((each) => each.id === id);
			console.log(`click file menu item: ${FileMenuItem[id]}, item info: ${JSON.stringify(itemInfo, null, 4)}`);
		},
	},
];

// id should start from non-zero value
enum ThemeMenuItem {
	Light = 1,
	Dark,
}

const rightToolbarItems: IToolbarComponentProps["items"] = [
	{
		type: ToolBarItemType.Menu,
		name: "Theme",
		items: [
			{
				id: ThemeMenuItem.Light,
				name: "Light",
			},
			{
				id: ThemeMenuItem.Dark,
				name: "Dark",
			},
		],
		defaultRadioId: ThemeMenuItem.Light as const,
		onClick(sender, id: ThemeMenuItem) {
			sender.SetRadioId(id);
			const itemInfo = this.items.find((each) => each.id === id);
			console.log(`click theme menu item: ${JSON.stringify(itemInfo, null, 4)}`);
		},
	},
];

const toolbarStyle: IToolbarStyle = {
	textColor: new Vec4(255, 255, 255, 255 * 0.8),
};

export function TestToolbarBoth() {
	return (
		<Window title="Test Toolbar Both">
			<Toolbar items={leftToolbarItems} style={toolbarStyle} />
			<Toolbar position="right" items={rightToolbarItems} style={toolbarStyle} />
			<Grid />
		</Window>
	);
}
