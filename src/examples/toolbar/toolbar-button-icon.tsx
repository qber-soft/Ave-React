import { App, ToolBarItemType, Vec4 } from "ave-ui";
import React, { useCallback } from "react";
import { Window, Toolbar, Grid, IToolbarComponentProps, IToolbarStyle, getAppContext, IIconResource } from "../../ave-react";
import { iconResource } from "./icon-resource";

enum ToolbarItemId {
	Theme = 1,
	JsFile,
}

const toolbarItems: IToolbarComponentProps["items"] = [
	{
		type: ToolBarItemType.Button,
		id: ToolbarItemId.Theme,
		icon: "theme",
	},
	{
		type: ToolBarItemType.Button,
		id: ToolbarItemId.JsFile,
		icon: "js-file",
	},
];

const toolbarStyle: IToolbarStyle = {
	textColor: new Vec4(255, 255, 255, 255 * 0.8),
};

function onInit(app: App) {
	const context = getAppContext();
	context.setIconResource(iconResource as unknown as IIconResource);
}

export function TestToolbarButtonIcon() {
	const onClick = useCallback<IToolbarComponentProps["onClick"]>((sender, id) => {
		console.log(`on click: ${id}`);
	}, []);

	return (
		<Window title="Test Toolbar Button Icon" onInit={onInit}>
			<Toolbar position="right" items={toolbarItems} style={toolbarStyle} onClick={onClick} />
			<Grid />
		</Window>
	);
}
