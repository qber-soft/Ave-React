import React from "react";
import { AppContainer } from "../../renderer";
import { diffProps } from "./algorithm";
import { IControl, Grid as NativeGrid, Window as NativeWindow } from "ave-ui";
import * as Trace from "../../dev/trace";

export type ReactAveTag<Props> = string | React.ComponentType<Props>;

export interface IComponentProps {
	style?: IComponentStyle;
	langKey?: string;
	children?: any[] | any;
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

	protected window: NativeWindow;

	constructor(initProps = {} as Props) {
		this.props = initProps;
		this.children = [];
		this.parentGrid = null;
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

	protected abstract onUpdateProp(propName: string, propValue: any);

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
