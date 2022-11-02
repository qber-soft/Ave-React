import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { IListBox, ListBox as NativeListBox } from "ave-ui";

export interface IListBoxComponentProps extends IComponentProps {
	items?: string[];
	onSelectionEnd?: Parameters<IListBox["OnSelectionEnd"]>[0];
}

class ListBoxComponent extends AveComponent<IListBoxComponentProps> {
	static tagName = "ave-list-box";

	private listBox: NativeListBox;
	private items: IListBoxComponentProps["items"];

	protected onCreateUI() {
		this.listBox = new NativeListBox(this.window);
		this.items = [];
		return this.listBox;
	}

	protected onUpdateProp(propName: keyof IListBoxComponentProps, propValue: any) {
		switch (propName) {
			case "items": {
				this.updateItems(propValue ?? []);
				break;
			}
			case "onSelectionEnd": {
				this.listBox.OnSelectionEnd(propValue ?? (() => {}));
				break;
			}
		}
	}

	private updateItems(newItems: string[]) {
		newItems.forEach((item, index) => {
			const prevItem = this.items[index];
			if (prevItem === undefined) {
				this.listBox.Insert(item, index);
			} else if (prevItem !== item) {
				this.listBox.Remove(index);
				this.listBox.Insert(item, index);
			}
		});

		if (newItems.length < this.items.length) {
			for (let i = this.items.length - 1; i >= newItems.length; --i) {
				this.listBox.Remove(i);
			}
		}

		this.items = [...newItems];
	}
}

class Config extends ComponentConfig {
	tagName = ListBoxComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new ListBoxComponent(initProps);
	}
}

export const ListBox = registerComponent<IListBoxComponentProps>(new Config());
