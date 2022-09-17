import { App } from "ave-ui";
import React from "react";
import { Window, Button, getAppContext, IIconResource } from "../../ave-react";
import { DemoLayout } from "../common";
import { iconResource } from "./icon-resource";

function onInit(app: App) {
	const context = getAppContext();
	context.setIconResource(iconResource as unknown as IIconResource);
}

export function TestButtonIcon() {
	return (
		<Window title="Button Icon" onInit={onInit}>
			<DemoLayout>
				<Button text="Open File" iconInfo={{ name: "open-file", size: 16 }}></Button>
			</DemoLayout>
		</Window>
	);
}
