import { Rect } from "ave-ui";
import { Button, getActiveWindow, Region, Window, screen, getWindows, Point, mouse } from "@nut-tree/nut-js";
import { AveComponent } from "../../../src/ave-react";
import { getRectRelativeToWindow } from "../../ave-testing";

export async function getRegionRelativeToScreenForComponent(window: Window, component: AveComponent) {
	const rect = getRectRelativeToWindow(component);
	return getRegionRelativeToScreen(window, rect);
}

export async function getRegionRelativeToScreen(window: Window, rect: Rect) {
	const windowRegion = await window.region;
	return new Region(windowRegion.left + rect.Position.x, windowRegion.top + rect.Position.y, rect.Size.x, rect.Size.y);
}

export async function focusWindow(window: Window, offset = { left: 10, top: 10 }) {
	const windowRegion = await window.region;
	await mouse.setPosition(new Point(windowRegion.left + offset.left, windowRegion.top + offset.left));
	await mouse.click(Button.LEFT);
}

export async function highlight(component: AveComponent, padding: number = 0) {
	const activeWindow = await getActiveWindow();
	screen.config.highlightDurationMs = 5000;

	const rect = getRectRelativeToWindow(component);
	const region = await getRegionRelativeToScreen(activeWindow, rect);

	if (padding) {
		region.left -= padding;
		region.top -= padding;
		region.width += padding * 2;
		region.height += padding * 2;
	}
	await screen.highlight(region);
}

export async function findWindowByTitle(title: string) {
	const windows = await getWindows();
	for (let i = 0; i < windows.length; ++i) {
		const each = windows[i];
		const currentTitle = await each.title;
		if (currentTitle.includes(title)) {
			return each;
		}
	}
	return null;
}
