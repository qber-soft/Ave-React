// https://stackoverflow.com/questions/62066780/chrome-devtools-opens-as-a-search-rather-then-the-dev-tools-themselves
// devtools://devtools/bundled/inspector.html?experiments=true&ws=localhost:6710

import ws from "ws";
import { Window as NativeWindow, Rect } from "ave-ui";
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
			} else if (message.method === "Page.startScreencast") {
				console.log("received: %s", message, message.params);
				const response = JSON.stringify({
					id: message.id,
					result: {},
				});
				ws.send(response);
				ws.send(
					JSON.stringify({
						method: "Page.screencastFrame",
						params: {
							// https://onlinejpgtools.com/convert-jpg-to-base64
							data: "iVBORw0KGgoAAAANSUhEUgAAAH8AAAA3CAYAAAAltpUSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAiDSURBVHhe7ZtxTBvXHce/MT4DtuvYmFwNtqGmnoECjeMxuYtQFaGWoAyqqpoitCZRV/7JH1OkqZM6KlRNVaRok1CkaX+gKqxorBJCC4pCFYVpRVGGkrmrEkYgpJYVDwjIMxh7jnHABmfP9iucHUgcYzOcu49kce/dvbsf73vv/X7v9+x9jwkQ4CUi+leAhwji8xhBfB4jiM9jBPF5jCA+jxHE5zGC+DxGEJ/HCOLzGEF8HiOIz2ME8XmMID6PEcTnMYL4PEYQn8cI4vMYQXweI4jPY9L/AmckiLnRO+j5xguvXIW2FjOsunx68gUl5MXE1TvouxsEo9OivaUGBmXujp/0LV+cxsUbHkwEI5hze9A3OovlCD2XE4Sx/GAeznuzsc+cK0jrt2fZ4UDPWADOUAT2+7Pov7VI7pK7pC++KA8SehiFIeWcIuSH7coYPh64E/ucuzb/zJdXIk78n6Nlhh7nIumLX2zAe00aNGqkOFRRivYjOshe8AiCqTDh9JtqWFkpGmoNaLOo6JnchL8/2gh5MNJrQ7crXmRNJvz2uPGFf4G5pC9+YB4jlxwY9ZO5UiSCqb6OjIR8OP/2L/Q7VmO+kDWS2cG4CtuNeQzfD8Ida0iu1anRfLgSDVWKWE00eNxoR+6lrTKgUU7EubWAEVc47lfF+bCaNGg9YoKpmE62kQDsV8dw8d9rsWuUrxjQ3lyeKOCKC6OX7BhZitupOyCBf2EF/sg63Iur1CaCmIFJyZCpXAzrm2YcrZLTExyWnBi8PE3iHHL8/XUmUXq2c1khsdN1B4YmPLgdiFfJlAocNethlXow9K0fPmK+jC3FyXdMYLm+ZwekL77Pib4LUxiicdKhw/X4VWMBJgZu4JydOs+oCNv6UQZHmyw49YYaTMSP29x2T0Msxcl3LWh9jbw4a17Y/mxD10y8nazMgPMnqqEUx4pxArMYvHAH/f540aAthHvuEZbjxS0Q4eixw2ivpy8ml/lJdPVOw7YWLdDrLEjPdkrY7cDFfjsGfbTiaRSX4vyHZmgLaHmHZHeSe2p/hDF8w4HvoiPyeVgLou+rcdjcORhnJ9sedJHZM0Xhs0D2PZxUjpMt9fjik2P48hd1OGPkTHsBMnJn6DyXhIw9gI9ONGDgkyP4vM2INg3H1BU/BokrSWdpyZRU4vNPj2Hg11ac1tBKQtTnf9FJ6j9t3nrUPwep2R6Gb8yBfhpzRGGUapz5qZX0VTO+/LAaJ8uyu5bIrvgSOc60WdFqYSEjUzFTpEdDUzkaN3xWNEcQjPtFLooD6PjZD2GtICKQqVJJhHnvxOtoZ+l5gvO+C3MP01A/26Rqu2cJt+76N92PXI2OEz9Cw2tq0lciMDoDWo/XJbTLNFkVnylSw8QmZf3ITKCV0mPC8sqT0zcjJZ1WkGSaVAOrWQEZLSIQIC5jnRb2DinbPu+Fc4mWCaYqPSqTs4UFUrBZzCBmVfwtIRGxhBOQhdYiCKU0gEWQle4HCa4pYbgfxiKvHOBJ210LQcyFaJGcN2jkYHZZjd0XfwcwBeKEZVx4JVfE38L2R2FOzJIHlZS7RNkdckp8kFkiwUnkkvXJtov3/d9Twzklfji4Cu/GYM+DrHD3R0u6PGG7TBILguOswxvY/Vksh8QPw0uWhU5agoiBVlkACSfbFSJuILX4Ybd50nb9ywoYNpI1EdhnvLu+K7onxQ/7/SQSTloFLD7A8Fhgc+osUqJSXQClfHPyDPv/izkft10EPocLNprdexqxlyYDnZ+y7VoWtbpN2533nBi9n7itHHYT2x9k743YmyM/6EXXn26i/5oD9nvTmLj+T3T1TmFoIx8kgrW2FKy8AKpSsrSitdEEyu//cgsj307DPj6F4f7r6Ly8sDniuJDRp5Ju/vu+edLR4+RZ/5jC7Zln7+1vS8q2y2Ewk6UwrY1m/3oGbqL78iRujzthu2rDuV4HRnZgyrPYu9P+SgCD1+3oHJjEZ9cWYON0gkyjRVs9SwImEZQmHZqL6AnC8qIH3Vcm0XnJiR7795tJWyAuhFYn3Qy6gn50f0We9ddp/H3mEa1Mk5RsJ8dGE069zsmDrK1iZGwa5y5NoesbDyY2loLZYc+Kv10krNRo0HG8ZjNRpNCjtaUcDZzEUSJkjU2PEmHAWgxoK6bFDJKy7SI5TMcs6KjlvIRJbFefCfJ+Q6DHz0kEeZHHKFPLcFCrQu2rLMpUEuStr0P9UiEOahSwGIph1L8EyT7aJAZpt76GEmW0Hbmm4mWUsyK4J2cx6olvMDIaPX7XVo5ayWMUEpcny2dgKlPj3YYqfNBkRIk04YbIU7KwmvejWhxBwXoEhRISDBYp8LZZj5//pAoNqsco2S+NPa+OPM9QTEdb/n5U1pB2xBuvE4eskObjkIHFGzUsShRbdPvDBdwcI3FFzA3vg/EHelhKANcObEdeIUqqtWjWi1EiivapCCpZIazVGpxqehUHff/BTV/83jJlMVotB5CcQEyX9Ld0M0nSli6jKcf5D2oytm+dMVLY0n0+2yNYvjuOvvE8cq8aGBRJqi4R1/VHErtQt2Ew1+Fsiz5jmcC96/P3IIlrdYJ4Z90XnplCz+V5jNhn8XGvDaN3PQjH3yES6TsxNPjdhvBRB3CoQpXRFLAg/rNYcWH4wtfo/MPX+GW/C3ZaHd2x23AfaRHGsjv6TWBa9HnJSsWG989ewfufkU/3FPrm6ZtAYF/RodG0xbeLdoAgfiqEVmFfWoV7UwsihgYWdifhGAOlxYyOt1QwJKmQlCWAsrQUH71TmXE3KIifBgZjOTpajFDuVAxRPtjDP8bZ03U4YyZBc9KKhS1WoO0tM4khzFn5ccjeCPj2OpFV+Gbc8IYYqHQslJzkUC4jiM9jhGmfxwji8xhBfB4jiM9jBPF5jCA+bwH+B6QBM6nowuT7AAAAAElFTkSuQmCC",
							metadata: {
								offsetTop: 0,
								pageScaleFactor: 1,
								deviceWidth: 640,
								deviceHeight: 480,
								scrollOffsetX: 0,
								scrollOffsetY: 0,
							},
							sessionId: 0,
						},
					})
				);
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

function componentToNode(component: AveComponent) {
	// console.log(component);
	const node = {
		nodeId: component.nodeId,
		backendNodeId: component.nodeId,
		nodeName: component.nodeName,
		childNodeCount: 0,
		nodeType: 1, // element node: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
		children: component.children.map((each) => componentToNode(each)),
	};

	return node;
}
