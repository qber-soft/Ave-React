import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "./common";
import { AppContainer } from "../renderer";
import { AlignType, Pager as NativePager } from "ave-ui";
import * as Trace from "../dev/trace";

export interface IPagerComponentProps extends IComponentProps {
	onSetContent?: (pager: NativePager) => void;
}

class PagerComponent extends AveComponent<IPagerComponentProps> {
	static tagName = "ave-pager";

	private pager: NativePager;
	private onSetContent: IPagerComponentProps["onSetContent"];

	protected onCreateUI() {
		this.pager = new NativePager(this.window);
		this.pager.SetContentHorizontalAlign(AlignType.Center);
		this.pager.SetContentVerticalAlign(AlignType.Center);
		this.onSetContent = null;
		return this.pager;
	}

	afterCreateUI(): void {
		super.afterCreateUI();

		if (this.children.length === 1) {
			const [firstChild] = this.children;
			this.addControl(firstChild);
		} else {
			throw new Error(`expect pager children size to be 1, but ${this.children.length} found`);
		}
	}

	private addControl(child: AveComponent) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "addControl",
				type: `${this["__type__"]}-${this["__id__"]}`,
				detail: {
					parent: this,
					child,
				},
			});
		}

		const childControl = child.createUI(this.window);
		this.pager.SetContent(childControl);
		if (this.onSetContent) {
			this.onSetContent(this.pager);
		}

		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "addControl",
				detail: {},
			});
		}
	}

	protected onUpdateProp(propName: keyof IPagerComponentProps, propValue: any) {
		switch (propName) {
			case "onSetContent": {
				this.onSetContent = propValue ?? (() => {});
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = PagerComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new PagerComponent(initProps);
	}
}

export const Pager = registerComponent<IPagerComponentProps>(new Config());
