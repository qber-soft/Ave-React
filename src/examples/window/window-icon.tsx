import { App } from "ave-ui";
import React, { useEffect } from "react";
import { getAppContext, IIconResource, Window } from "../../ave-react";
import { iconResource, IconResourceMapType } from "./icon-resource";

function onInit(app: App) {
	const context = getAppContext();
	context.setIconResource(iconResource as unknown as IIconResource);
}

export function TestWindowIcon() {
	useEffect(() => {
		const context = getAppContext();
		const resMap = context.getIconResourceMap<IconResourceMapType>();
		console.log(`res id: ${resMap.windowIcon}`);
	}, []);

	return <Window title="Test Icon" onInit={onInit} />;
}
