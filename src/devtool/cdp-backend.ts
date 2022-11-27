// https://stackoverflow.com/questions/62066780/chrome-devtools-opens-as-a-search-rather-then-the-dev-tools-themselves
// devtools://devtools/bundled/inspector.html?experiments=true&ws=localhost:6710

import ws from "ws";
import { AveComponent, getAppContext } from "../ave-react";

export async function startChromeDevtoolBackend() {
	const server = new ws.Server({ port: 6710 });
	server.on("connection", (ws) => {
		ws.on("message", (data: string) => {
			// console.log("received: %s", data);
			const message = JSON.parse(data) as any;
			if (message.method === "DOM.enable") {
				const response = JSON.stringify({
					id: message.id,
					method: "DOM.enable",
					result: {},
				});
				ws.send(response);
				// console.log("send: %s", response);
			} else if (message.method === "DOM.getDocument") {
				const document = getDocument();
				// console.log(document);
				const response = JSON.stringify({
					id: message.id,
					result: {
						root: document,
						// root: {
						// 	nodeId: 1,
						// 	backendNodeId: 1,
						// 	nodeName: "root",
						// 	childNodeCount: 1,
						// 	nodeType: 9,
						// 	children: [
						// 		{
						// 			nodeId: 2,
						// 			parentId: 1,
						// 			backendNodeId: 2,
						// 			nodeType: 1,
						// 			nodeName: "window",
						// 			localName: "window",
						// 			childNodeCount: 0,
						// 			children: [],
						// 		},
						// 	],
						// },
					},
				});
				ws.send(response);
			}
		});
	});
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
		nodeId: (component as any).__id__,
		backendNodeId: (component as any).__id__,
		nodeName: (component as any).__type__,
		childNodeCount: 0,
		nodeType: 1, // element node: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
		children: component.children.map((each) => componentToNode(each)),
	};

	return node;
}
