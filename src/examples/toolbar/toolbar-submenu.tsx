import { ToolBarItemType, Vec4 } from "ave-ui";
import React from "react";
import { Window, Toolbar, Grid, IToolbarComponentProps, IToolbarStyle } from "../../ave-react";

// id should start from non-zero value
enum FileMenuItem {
	New = 1,
	Open,
	Save,
	OpenRecent,
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
			},
			{
				id: FileMenuItem.Save,
				name: "Save File",
			},
			{
				id: FileMenuItem.OpenRecent,
				name: "Open Recent",
				subMenu: {
					children: [
						{
							id: 1,
							name: `D:\\GitHub\\ave-color-picker`,
						},
						{
							id: 2,
							name: `D:\\GitHub\\ave-image-diff`,
						},
					],
					onClick(sender, id) {
						const itemInfo = this.children.find((each) => each.id === id);
						console.log(`click file submenu item: ${JSON.stringify(itemInfo, null, 4)}`);
					},
				},
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

export function TestToolbarSubMenu() {
	return (
		<Window title="Test Toolbar SubMenu">
			<Toolbar items={toolbarItems} style={toolbarStyle} />
			<Grid />
		</Window>
	);
}
