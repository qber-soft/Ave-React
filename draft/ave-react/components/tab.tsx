import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { Tab as NativeTab, TabItem } from "ave-ui";
import { GridComponent } from "./grid";

export interface ITabComponentProps extends IComponentProps {
	items: ITabItem[];
}

export interface ITabItem {
	id: number;
	name: string;
}

class TabComponent extends AveComponent<ITabComponentProps> {
	static tagName = "ave-tab";

	private tab: NativeTab;
	private items: ITabComponentProps["items"];

	protected onCreateUI() {
		this.tab = new NativeTab(this.window);
		this.items = [];
		return this.tab;
	}

	protected onUpdateProp(propName: keyof ITabComponentProps, propValue: any) {
		switch (propName) {
			case "items": {
				this.items = propValue ?? [];
				break;
			}
		}
	}

	afterCreateUI(): void {
		super.afterCreateUI();
		this.items.forEach((item, index) => {
			const tabItem = new TabItem();
			tabItem.Id = item.id;
			tabItem.Text = item.name;
			this.tab.TabInsert(tabItem);

			const child = this.children[index];
			if (child) {
				if (child instanceof GridComponent) {
					const childControl = child.createUI(this.window);
					this.tab.ContentSet(tabItem.Id, childControl);
				} else {
					console.warn(`expect tab content to be Grid`);
				}
			}
		});

		if (this.children.length !== this.items.length) {
			console.warn(`expect tab children size to be ${this.items.length}, but ${this.children.length} found`);
		}
	}
}

class Config extends ComponentConfig {
	tagName = TabComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new TabComponent(initProps);
	}
}

export const Tab = registerComponent<ITabComponentProps>(new Config());
