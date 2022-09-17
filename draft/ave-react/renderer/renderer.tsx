import Reconciler from "react-reconciler";
import { AppContainer } from "./container";
import { getComponentByTagName, AveComponent } from "../components/common/config";
import { AppContext } from "./context";
import * as Trace from "../dev/trace";

/**
 * This is custom react renderer implementation for NodeAve
 *
 * Reference materials:
 *
 * 1. https://blog.atulr.com/react-custom-renderer-1/
 * 2. https://agent-hunt.medium.com/hello-world-custom-react-renderer-9a95b7cd04bc
 * 3. https://github.com/facebook/react/tree/master/packages/react-reconciler
 * 4. document of react-reconciler: react-reconciler/index.d.ts
 *
 */

export type IHostConfig = Reconciler.HostConfig<
	/** Type: element type, we will use (string) tag type */
	string,
	/** Props */
	any,
	/** Container */
	AppContainer,
	any,
	any,
	any,
	any,
	any,
	/** HostContext */
	any,
	any,
	any,
	any,
	any
>;

export const HostConfig: Partial<IHostConfig> = {
	now: Date.now,

	/**
	 * This method lets you return the initial host context from the root of the tree.
	 * If you don't intend to use host context, you can return `null`.
	 */
	getRootHostContext(rootContainer) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "getRootHostContext",
				type: "renderer",
			});
		}
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "getRootHostContext",
			});
		}
		return null;
	},

	/**
	 * Host context lets you track some information about where you are in the tree
	 * If you don't want to do anything here, return `parentHostContext`.
	 */
	getChildHostContext(parentHostContext, type, rootContainer) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "getChildHostContext",
				type: "renderer",
				detail: {
					type,
					rootContainer,
				},
			});
		}
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "getChildHostContext",
			});
		}
		return parentHostContext;
	},

	/**
	 * If you return `true` from this method, React will assume that this node's children are text, and will not create nodes for them.
	 * If you return `true`, you will need to implement `resetTextContent` too.
	 * If you want to creat a text node, return false
	 */
	shouldSetTextContent(type, props) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "shouldSetTextContent",
				type: "renderer",
				detail: {
					type,
					props,
				},
			});
		}
		const result = false;
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "shouldSetTextContent",
				detail: {
					result,
				},
			});
		}
		return result;
	},

	/**
	 * Same as `createInstance`, but for text nodes. If your renderer doesn't support text nodes, you can throw here.
	 */
	createTextInstance(text, rootContainer, hostContext, internalHandle) {
		throw new Error("Text nodes are not supported");
	},

	/**
	 * Create instance is called on all host nodes except the leaf text nodes.
	 * This method should return a newly created node.
	 * For example, the DOM renderer would call `document.createElement(type)` here and then set the properties from `props`.
	 */
	createInstance(type, props, rootContainer, hostContext) {
		{
			("use trace");
			id: "auto";
		}
		const component = getComponentByTagName(type);
		const instance = component.createInstance(props, rootContainer, hostContext);
		{
			("use trace");
			start: (id: number) => {
				// add trace here, so we can record type = `${instance["__type__"]}-${instance["__id__"]}`
				instance["__name__"] = instance.constructor.name;
				instance["__id__"] = id;
				instance["__type__"] = type;
				globalThis.__components__[id] = instance;
				return {
					id,
					name: "createInstance",
					type: `${instance["__type__"]}-${instance["__id__"]}`,
					detail: {
						type,
						props,
					},
				};
			};
		}
		{
			("use trace");
			end: (id: number) => {
				return {
					id,
					name: "createInstance",
					detail: {
						instance,
					},
				};
			};
		}
		return instance;
	},

	/**
	 * It's called while the tree is still being built up and not connected to the actual tree on the screen.
	 * This method will be called for each child of the current node.
	 */
	appendInitialChild(parent: AveComponent, child: AveComponent): void {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => {
				return {
					id,
					name: "appendInitialChild",
					type: `${parent["__type__"]}-${parent["__id__"]}`,
					detail: {
						parent,
						child,
					},
				};
			};
		}
		parent.appendChild(child);
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "appendInitialChild",
			});
		}
	},

	/**
	 * In case of react-dom, this adds default dom properties such as event listeners, etc.
	 * For implementing auto focus for certain input elements (autofocus can happen only after render is done),
	 * react-dom sends return type as true. This results in commitMount method for this element to be called.
	 *
	 * There is a second purpose to this method.
	 * It lets you specify whether there is some work that needs to happen when the node is connected to the tree on the screen.
	 * If you return `true`, the instance will receive a `commitMount` call later.
	 */
	finalizeInitialChildren(instance, type, props, rootContainer, hostContext) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "finalizeInitialChildren",
				type: `${instance["__type__"]}-${instance["__id__"]}`,
				detail: {
					instance,
					type,
					props,
				},
			});
		}
		const component = getComponentByTagName(type);
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "finalizeInitialChildren",
			});
		}
		return component.finalizeInitialChildren(instance, type, props, rootContainer, hostContext);
	},

	/**
	 * This method lets you store some information before React starts making changes to the tree on the screen.
	 * For example, the DOM renderer stores the current text selection so that it can later restore it. This method is mirrored by `resetAfterCommit`.
	 * Even if you don't want to do anything here, you need to return `null` from it.
	 */
	prepareForCommit(rootContainer) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "prepareForCommit",
				type: "renderer",
			});
		}
		const result = null;
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "prepareForCommit",
				detail: {
					result,
				},
			});
		}
		return result;
	},

	/**
	 * This method is called right after React has performed the tree mutations. You can use it to restore something you've stored in `prepareForCommit` — for example, text selection.
	 * You can leave it empty.
	 */
	resetAfterCommit(rootContainer): void {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "resetAfterCommit",
				type: "renderer",
			});
		}
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "resetAfterCommit",
			});
		}
	},

	/**
	 * Meaning the entire tree has been attached to the dom.
	 * It lets you do some additional work after the node is actually attached to the tree on the screen for the first time.
	 * This method is mainly used in react-dom for implementing autofocus.
	 */
	commitMount(instance, type, props): void {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "commitMount",
				type: `${instance["__type__"]}-${instance["__id__"]}`,
				detail: {
					instance,
					type,
					props,
				},
			});
		}
		const component = getComponentByTagName(type);
		component.commitMount(instance, type, props);
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "commitMount",
			});
		}
	},

	/**
	 * This method should mutate the `container` root node and remove all children from it.
	 */
	clearContainer(rootContainer) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "clearContainer",
				type: "renderer",
				detail: {
					rootContainer,
				},
			});
		}
		rootContainer.clearContainer();
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "clearContainer",
			});
		}
	},

	/**
	 * Same as `appendChild`, but for when a node is attached to the root container.
	 * This is useful if attaching to the root has a slightly different implementation, or if the root container nodes are of a different type than the rest of the tree.
	 */
	appendChildToContainer(rootContainer, child) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "appendChildToContainer",
				type: "renderer",
				detail: {
					root: rootContainer,
					child,
				},
			});
		}
		rootContainer.appendChild(child);
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "appendChildToContainer",
			});
		}
	},

	/**
	 * The reconciler has two modes: mutation mode and persistent mode. You must specify one of them.
	 */
	supportsMutation: true,

	/**
	 * React calls this method so that you can compare the previous and the next props, and decide whether you need to update the underlying instance or not.
	 */
	prepareUpdate(instance, type, oldProps, newProps, rootContainer, hostContext) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "prepareUpdate",
				type: `${instance["__type__"]}-${instance["__id__"]}`,
				detail: {
					instance,
					type,
					oldProps,
					newProps,
				},
			});
		}
		const component = getComponentByTagName(type);
		const updatePayload = component.prepareUpdate(instance, type, oldProps, newProps, rootContainer, hostContext);
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "prepareUpdate",
				detail: {
					updatePayload,
				},
			});
		}
		return updatePayload;
	},

	/**
	 * This method should mutate the `instance` according to the set of changes in `updatePayload`.
	 * This is where we should do all our dom manupulation work if needed.
	 */
	commitUpdate(instance, updatePayload, type, oldProps, newProps, internalHandle): void {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "commitUpdate",
				type: `${instance["__type__"]}-${instance["__id__"]}`,
				detail: {
					instance,
					type,
					updatePayload,
				},
			});
		}
		const component = getComponentByTagName(type);
		component.commitUpdate(instance, updatePayload, type, oldProps, newProps);
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "commitUpdate",
			});
		}
	},

	/**
	 * Here we perform the actual dom update on the textNode.
	 */
	commitTextUpdate(textInstance, oldText: string, newText: string): void {},

	/**
	 * This method should mutate the `parentInstance` to remove the `child` from the list of its children.
	 */
	removeChild(parent: AveComponent, child: AveComponent) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => {
				return {
					id,
					name: "removeChild",
					type: `${parent["__type__"]}-${parent["__id__"]}`,
					detail: {
						parent,
						child,
					},
				};
			};
		}
		parent.removeChild(child);
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "removeChild",
			});
		}
	},

	/**
	 * This method should mutate the `parentInstance` and add the child to its list of children. For example, in the DOM this would translate to a `parentInstance.appendChild(child)` call.
	 */
	appendChild(parent: AveComponent, child: AveComponent) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => {
				return {
					id,
					name: "appendChild",
					type: `${parent["__type__"]}-${parent["__id__"]}`,
					detail: {
						parent,
						child,
					},
				};
			};
		}
		parent.appendChild(child);
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "appendChild",
			});
		}
	},
	removeChildFromContainer(container, child) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "removeChildFromContainer",
				type: "renderer",
				detail: {
					container,
					child,
				},
			});
		}
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "removeChildFromContainer",
			});
		}
	},
	insertInContainerBefore: function (container, child, beforeChild) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "insertInContainerBefore",
				type: "renderer",
				detail: {
					container,
					child,
					beforeChild,
				},
			});
		}
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "insertInContainerBefore",
			});
		}
	},
	insertBefore(parent, child, beforeChild) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "insertBefore",
				type: `${parent["__type__"]}-${parent["__id__"]}`,
				detail: {
					parent,
					child,
					beforeChild,
				},
			});
		}
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "insertBefore",
			});
		}
	},
};

const context = new AppContext();

export function getAppContext() {
	return context;
}

export const AveRenderer = {
	render(element: React.ReactNode) {
		const app = new AppContainer(getAppContext());
		const reconcilerInstance = Reconciler(HostConfig as IHostConfig);
		const container = reconcilerInstance.createContainer(app, 0 /** not concurrent */, false, null);

		/**
		 * start reconcilation and render the result
		 */
		reconcilerInstance.updateContainer(element, container, null, null);
	},
};
