// https://stackoverflow.com/questions/62066780/chrome-devtools-opens-as-a-search-rather-then-the-dev-tools-themselves
// devtools://devtools/bundled/inspector.html?experiments=true&ws=localhost:6710

import ws from "ws";
import { Window as NativeWindow, Rect, AveImage, ImageDimension, ImageContainerType } from "ave-ui";
import { AveComponent, getAppContext } from "../ave-react";
import { Button, Region, Window, screen, getWindows, mouse, Point } from "@nut-tree/nut-js";

export async function startChromeDevtoolBackend() {
	const server = new ws.Server({ port: 6710 });
	server.on("connection", (ws) => {
		ws.on("message", (data: string) => {
			// console.log("received: %s", data);
			const message = JSON.parse(data) as any;
			if (message.method === "DOM.enable") {
				const response = JSON.stringify({
					id: message.id,
					result: {},
				});
				ws.send(response);
			} else if (message.method === "DOM.getDocument") {
				const document = getDocument();
				const response = JSON.stringify({
					id: message.id,
					result: {
						root: document,
					},
				});
				ws.send(response);
			} else if (message.method === "DOM.setInspectedNode") {
				const { nodeId } = message.params;
				inspectNode(nodeId);
				const response = JSON.stringify({
					id: message.id,
					result: {},
				});
				ws.send(response);
			} else if (message.method === "Page.enable") {
				const response = JSON.stringify({
					id: message.id,
					result: {},
				});
				ws.send(response);
			} else if (message.method === "CSS.getComputedStyleForNode") {
				// can be empty, but must send
				const response = JSON.stringify({
					id: message.id,
					result: {
						computedStyle: [],
					},
				});
				ws.send(response);
			} else if (message.method === "CSS.getMatchedStylesForNode") {
				const { nodeId } = message.params;
				const inlineStyle = getInlineStylesForNode(nodeId);
				const response = JSON.stringify({
					id: message.id,
					result: {
						inlineStyle,
					},
				});
				ws.send(response);
			} else if (message.method === "Page.startScreencast") {
				startScreencast(ws, message);
			}

			// else if (message.method === "Inspector.enable") {
			// 	const response = JSON.stringify({
			// 		id: message.id,
			// 		result: {},
			// 	});
			// 	ws.send(response);
			// }
			// else if (message.method === "Overlay.enable") {
			// 	const response = JSON.stringify({
			// 		id: message.id,
			// 		result: {},
			// 	});
			// 	ws.send(response);
			// } else if (["Overlay.setShowViewportSizeOnResize", "Overlay.setShowGridOverlays", "Overlay.setShowFlexOverlays", "Overlay.setShowScrollSnapOverlays", "Overlay.setShowContainerQueryOverlays", "Overlay.setShowIsolatedElements", "Overlay.hideHighlight"].includes(message.method)) {
			// 	const response = JSON.stringify({
			// 		id: message.id,
			// 		result: {},
			// 	});
			// 	ws.send(response);
			// }
		});
	});
}

async function startScreencast(ws: ws.WebSocket, message: any) {
	const response = JSON.stringify({
		id: message.id,
		result: {},
	});
	ws.send(response);

	const windowComponent = getWindowComponent();
	let id = 0;
	windowComponent.nativeControl.SetViewReadback((sender, data) => {
		console.log("on view readback");
		const aveImage = new AveImage();
		aveImage.CreateFromImage(ImageDimension.Texture2D, data);

		const context = getAppContext();
		const app = context.getAveApp();
		const codec = app.GetImageCodec();
		const ab = codec.SaveArrayBuffer(aveImage, ImageContainerType.PNG);
		const buffer = Buffer.from(ab);
		const base64 = buffer.toString("base64");

		// fs.writeFileSync("base64.txt", base64, "utf8");
		// console.log(base64);
		ws.send(
			JSON.stringify({
				method: "Page.screencastFrame",
				params: {
					data: base64,
					metadata: {
						offsetTop: 0,
						pageScaleFactor: 1,
						deviceWidth: 640,
						deviceHeight: 480,
						scrollOffsetX: 0,
						scrollOffsetY: 0,
					},
					sessionId: id,
				},
			})
		);
		++id;
	}, 0);
}

async function inspectNode(nodeId: number) {
	const components = getComponents();
	const toInspect = components.find((each) => each.nodeId === nodeId);
	if (toInspect) {
		highlight(toInspect);
	}
}

export function getRectRelativeToWindow(component: AveComponent) {
	const control = component.nativeControl;
	const { Size } = control.GetRectClient(); // use size
	const window = getWindowComponent();
	const rectClient = window.nativeControl.GetRectClient();
	const { Position } = control.MapRect(rectClient, true); // get position relative to window
	return new Rect(Position.x, Position.y, Size.x, Size.y);
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

export async function getNutjsWindow() {
	const windowComponent = getWindowComponent();
	const title = (windowComponent.nativeControl as NativeWindow).GetTitle();
	const window = await findWindowByTitle(title);
	return window;
}

// TODO: click center of title
export async function focusWindow(window: Window, offset = { left: 10, top: 10 }) {
	const windowRegion = await window.region;
	await mouse.setPosition(new Point(windowRegion.left + offset.left, windowRegion.top + offset.left));
	await mouse.click(Button.LEFT);
}

export async function highlight(component: AveComponent, padding: number = 0) {
	const activeWindow = await getNutjsWindow();
	// await focusWindow(activeWindow);
	screen.config.highlightDurationMs = 1000;

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

export async function getRegionRelativeToScreenForComponent(window: Window, component: AveComponent) {
	const rect = getRectRelativeToWindow(component);
	return getRegionRelativeToScreen(window, rect);
}

export async function getRegionRelativeToScreen(window: Window, rect: Rect) {
	const windowRegion = await window.region;
	return new Region(windowRegion.left + rect.Position.x, windowRegion.top + rect.Position.y, rect.Size.x, rect.Size.y);
}

//
export function getComponents(): AveComponent[] {
	const windowComponent = getWindowComponent();
	const components = [];
	visitComponent(windowComponent, components);
	return components;
}

export function getWindowComponent(): AveComponent {
	const context = getAppContext();
	const appContainer = context.getAppContainer();
	const children = appContainer.getChildren();
	const [windowComponent] = children;
	return windowComponent;
}

function visitComponent(root: AveComponent, components: AveComponent[]) {
	components.push(root);
	root.children.forEach((child) => visitComponent(child, components));
}

function getDocument() {
	const windowComponent = getWindowComponent();
	const window = componentToNode(windowComponent);
	const document = {
		nodeId: 0,
		backendNodeId: 0,
		nodeName: "root",
		childNodeCount: 0,
		nodeType: 9,
		children: [window],
	};

	return document;
}

function getInlineStylesForNode(nodeId: number) {
	const component = getComponents().find((each) => each.nodeId === nodeId);
	const inlineStyles = { cssProperties: [], shorthandEntries: [] };

	if (component) {
		const style = component.props?.style ?? {};

		Object.keys(style).forEach((name) => {
			const value = style[name];
			if (typeof value === "object") {
				// TODO: fix displayed css crossed out
				// const longhandProperties = [];
				// Object.keys(value).forEach((key) => {
				// 	const prop = value[key];
				// 	if (typeof prop === "object") {
				// 		longhandProperties.push({ name: key, value: JSON.stringify(prop) });
				// 	} else {
				// 		longhandProperties.push({ name: key, value: `${prop}` });
				// 	}
				// });
				// inlineStyles.shorthandEntries.push({ name, value: "..." });
				// inlineStyles.cssProperties.push({ name, value: "...", longhandProperties, disabled: false, implicit: false, parsedOk: true });
				inlineStyles.cssProperties.push({ name, value: JSON.stringify(value) });
			} else {
				inlineStyles.cssProperties.push({ name, value: `${value}` });
			}
		});
		return inlineStyles;
	}
	return inlineStyles;
}

function componentToNode(component: AveComponent) {
	// console.log(component);

	const attributes: Array<string> = [];
	Object.keys(component.props)
		.filter((name) => !["children", "style"].includes(name))
		.forEach((name) => {
			const prop = component.props[name];
			if (typeof prop !== "function") {
				if (typeof prop === "object") {
					attributes.push(name, JSON.stringify(prop));
				} else {
					attributes.push(name, `${prop}`);
				}
			}
		});

	const node = {
		nodeId: component.nodeId,
		backendNodeId: component.nodeId,
		nodeName: component.nodeName,
		childNodeCount: 0,
		nodeType: 1, // element node: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
		children: component.children.map((each) => componentToNode(each)),
		attributes,
	};

	return node;
}
