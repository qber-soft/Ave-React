import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { HeaderItem, HeaderItemFormat, RichListBox as NativeRichListBox, RichListBoxItemVirtual } from "ave-ui";
import { parseSize } from "./common";

export interface IRichListBoxComponentProps extends IComponentProps {
	headers: IRichListBoxHeader[];
	data?: IRichListBoxData[];
}

export interface IRichListBoxHeader {
	name: string;
	size: string;
	dataKey: string;
	align?: HeaderItemFormat;
}

export type IRichListBoxData = Record<string, string>;

class RichListBoxComponent extends AveComponent<IRichListBoxComponentProps> {
	static tagName = "ave-rich-list-box";

	private richListBox: NativeRichListBox;
	private headers: IRichListBoxComponentProps["headers"];

	protected onCreateUI() {
		this.richListBox = new NativeRichListBox(this.window);
		this.headers = [];
		return this.richListBox;
	}

	protected onUpdateProp(propName: keyof IRichListBoxComponentProps, propValue: any) {
		switch (propName) {
			case "headers": {
				this.setValueForHeaders(propValue ?? []);
				break;
			}

			case "data": {
				this.setValueForData(propValue ?? []);
				break;
			}
		}
	}

	private setValueForHeaders(headers: IRichListBoxComponentProps["headers"]) {
		const header = this.richListBox.GetHeader();
		{
			// TODO: support update
			header.RemoveAll();
		}
		headers.forEach((headerDesc) => {
			const headerItem = new HeaderItem(headerDesc?.align ?? HeaderItemFormat.Center, headerDesc.name, parseSize(headerDesc.size));
			header.Add(headerItem);
		});
		this.headers = [...headers];
	}

	private setValueForData(data: IRichListBoxComponentProps["data"]) {
		this.richListBox.SetVirtual((sender, rowIndex, headerIndex) => {
			const item = new RichListBoxItemVirtual();
			const itemData = data[rowIndex];
			const header = this.headers[headerIndex];
			item.String = itemData[header.dataKey] ?? "";
			return item;
		});
		this.richListBox.ItemSetCount(data.length);
	}
}

class Config extends ComponentConfig {
	tagName = RichListBoxComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new RichListBoxComponent(initProps);
	}
}

export const RichListBox = registerComponent<IRichListBoxComponentProps>(new Config());
