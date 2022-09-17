import { App, ToolBarItemType, Vec4 } from "ave-ui";
import React from "react";
import { Window, Toolbar, Grid, IToolbarComponentProps, IToolbarStyle, getAppContext, IIconResource } from "../../ave-react";
import { iconResource } from "./icon-resource";

// id should start from non-zero value
enum FileMenuItem {
	New = 1,
	Open,
	Save,
	SaveAs,
}

const toolbarItems: IToolbarComponentProps["items"] = [
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
				icon: "open-file",
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
			console.log(`click file menu item: ${JSON.stringify(itemInfo, null, 4)}`);
		},
	},
];

const toolbarStyle: IToolbarStyle = {
	textColor: new Vec4(255, 255, 255, 255 * 0.8),
};

function onInit(app: App) {
	const context = getAppContext();
	context.setIconResource(iconResource as unknown as IIconResource);
}

export function TestToolbarMenuIcon() {
	return (
		<Window title="Test Toolbar Menu Icon" onInit={onInit}>
			<Toolbar items={toolbarItems} style={toolbarStyle} />
			<Grid />
		</Window>
	);
}
