import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { HeaderItem, HeaderItemFormat, RichListBox as NativeRichListBox } from "ave-ui";
import { parseSize } from "./common";

export interface IRichListBoxComponentProps extends IComponentProps {
	headers: IRichListBoxHeader[];
}

export interface IRichListBoxHeader {
	name: string;
	size: string;
	align?: HeaderItemFormat;
}

class RichListBoxComponent extends AveComponent<IRichListBoxComponentProps> {
	static tagName = "ave-rich-list-box";

	private richListBox: NativeRichListBox;

	protected onCreateUI() {
		this.richListBox = new NativeRichListBox(this.window);
		return this.richListBox;
	}

	protected onUpdateProp(propName: keyof IRichListBoxComponentProps, propValue: any) {
		switch (propName) {
			case "headers": {
				this.setValueForHeaders(propValue ?? []);
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
	}
}

class Config extends ComponentConfig {
	tagName = RichListBoxComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new RichListBoxComponent(initProps);
	}
}

export const RichListBox = registerComponent<IRichListBoxComponentProps>(new Config());
