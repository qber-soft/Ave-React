import { ToolBarItemType, Vec4 } from "ave-ui";
import React from "react";
import { Window, Toolbar, Grid, IToolbarComponentProps, IToolbarStyle } from "../../ave-react";

// id should start from non-zero value
enum ThemeMenuItem {
	Light = 1,
	Dark,
}

const toolbarItems: IToolbarComponentProps["items"] = [
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

export function TestToolbarRight() {
	return (
		<Window title="Test Toolbar Right">
			<Toolbar position="right" items={toolbarItems} style={toolbarStyle} />
			<Grid />
		</Window>
	);
}
