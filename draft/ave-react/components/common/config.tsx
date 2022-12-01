import React from "react";
import { AppContainer } from "../../renderer";
import { diffProps } from "./algorithm";
import { IControl, Grid as NativeGrid, Window as NativeWindow } from "ave-ui";
import * as Trace from "../../dev/trace";

export type ReactAveTag<Props> = string | React.ComponentType<Props>;

export interface IComponentProps {
	id?: string;
	style?: IComponentStyle;
	langKey?: string;
	children?: any[] | any;

	onPointerEnter?: Parameters<IControl["OnPointerEnter"]>[0];
	onPointerLeave?: Parameters<IControl["OnPointerLeave"]>[0];
	onPointerPress?: Parameters<IControl["OnPointerPress"]>[0];
	onPointerRelease?: Parameters<IControl["OnPointerRelease"]>[0];
	onPointerMove?: Parameters<IControl["OnPointerMove"]>[0];
	onPointerHover?: Parameters<IControl["OnPointerHover"]>[0];
}

export interface IComponentStyle {
	area?: IGridArea;
	margin?: string;
}

export interface IGridArea {
	column: number;
	row: number;
	columnSpan?: number;
	rowSpan?: number;
}

let nextNodeId = 1;

export abstract class AveComponent<Props extends IComponentProps = IComponentProps> {
	/**
	 * used internally
	 */
	static tagName: string;

	/**
	 * current props
	 */
	props: Props;
	children: AveComponent<IComponentProps>[];
	parentGrid: NativeGrid;
	nativeControl: IControl;
	nodeName: string;
	nodeId: number;

	protected window: NativeWindow;

	constructor(initProps = {} as Props) {
		this.props = initProps;
		this.children = [];
		this.parentGrid = null;
		this.nodeId = nextNodeId;
		++nextNodeId;
		this.nodeName = "component";
	}

	setNodeName(name: string) {
		this.nodeName = name;
	}

	createUI(window: NativeWindow): IControl {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "createUI",
				type: `${this["__type__"]}-${this["__id__"]}`,
				detail: {
					props: this.props,
					children: this.children,
				},
			});
		}
		this.window = window;
		const control = this.onCreateUI();
		this.nativeControl = control;
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "createUI",
			});
		}
		this.afterCreateUI();
		return control;
	}

	afterCreateUI() {
		this.setInitialProps();
	}

	protected abstract onCreateUI(): IControl;

	setInitialProps() {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "setInitialProps",
				type: `${this["__type__"]}-${this["__id__"]}`,
				detail: {
					props: this.props,
				},
			});
		}

		const props = this.props ?? {};

		for (const propName in props) {
			const propValue = props[propName];
			this.commonOnUpdateProp(propName, propValue);
			this.onUpdateProp(propName, propValue);
		}

		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "setInitialProps",
			});
		}
	}

	protected onUpdateProp(propName: string, propValue: any) {}

	private commonOnUpdateProp(propName: string, propValue: any) {
		switch (propName) {
			case "onPointerEnter": {
				this.nativeControl.OnPointerEnter(propValue ?? (() => {}));
				break;
			}
			case "onPointerLeave": {
				this.nativeControl.OnPointerLeave(propValue ?? (() => {}));
				break;
			}
			case "onPointerPress": {
				this.nativeControl.OnPointerPress(propValue ?? (() => {}));
				break;
			}
			case "onPointerRelease": {
				this.nativeControl.OnPointerRelease(propValue ?? (() => {}));
				break;
			}
			case "onPointerMove": {
				this.nativeControl.OnPointerMove(propValue ?? (() => {}));
				break;
			}
			case "onPointerHover": {
				this.nativeControl.OnPointerHover(propValue ?? (() => {}));
				break;
			}
			case "style": {
				if (propValue?.area && this.gridControl) {
					const childArea = propValue?.area;
					this.gridControl.SetGrid(childArea.column ?? 0, childArea.row ?? 0, childArea.columnSpan ?? 1, childArea.rowSpan ?? 1);
				}
				break;
			}
		}
	}

	get gridControl() {
		return this?.parentGrid?.ControlGet(this?.nativeControl) ?? null;
	}

	get created() {
		return Boolean(this.window);
	}

	updateProps(oldProps: Props, newProps: Props, updatePayload: any[]): void {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "updateProps",
				type: `${this["__type__"]}-${this["__id__"]}`,
				detail: {
					oldProps,
					newProps,
					updatePayload,
				},
			});
		}
		this.props = newProps;
		for (let i = 0; i < updatePayload.length; i += 2) {
			const propName = updatePayload[i];
			const propValue = updatePayload[i + 1];
			this.commonOnUpdateProp(propName, propValue);
			this.onUpdateProp(propName, propValue);
		}
		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "updateProps",
			});
		}
	}

	appendChild(child: AveComponent<Props>): void {
		this.children.push(child);
	}

	insertBefore(child: AveComponent<Props>, beforeChild: AveComponent<Props>): void {
		const index = this.children.findIndex((each) => each === beforeChild);
		if (index !== -1) {
			this.children.splice(index, 0, child);
		}
	}

	removeChild(child: AveComponent<Props>): void {
		const index = this.children.findIndex((each) => each === child);
		if (index !== -1) {
			this.children.splice(index, 1);
		}
	}
}

export abstract class ComponentConfig {
	abstract tagName: string;
	abstract createInstance(initProps: any, app: AppContainer, context: any): AveComponent;

	commitUpdate(instance: AveComponent, updatePayload: any[], type: string, oldProps: any, newProps: any): void {
		instance.updateProps(oldProps, newProps, updatePayload);
	}

	prepareUpdate(instance: any, type: string, oldProps: any, newProps: any, rootContainer: AppContainer, hostContext: any) {
		const updatePayload = diffProps(oldProps, newProps);
		return updatePayload;
	}

	finalizeInitialChildren(...args: any[]) {
		return false;
	}

	commitMount(...args: any[]): void {
		return;
	}
}

const components = new Map<string, ComponentConfig>();

export function registerComponent<Props>(config: ComponentConfig): ReactAveTag<Props> {
	if (components.has(config.tagName)) {
		throw `A component with tagName: ${config.tagName} already exists. This base component will be ignored`;
	}
	components.set(config.tagName, config);
	return config.tagName;
}

export const getComponentByTagName = (tagName: string): ComponentConfig => {
	const config = components.get(tagName);
	if (!config) {
		throw `Unknown component ${tagName}`;
	}
	return config;
};

/**
 *
 */
