import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "./common";
import { AppContainer } from "../renderer";
import { Hyperlink as NativeHyperlink, IHyperlink } from "ave-ui";

export interface IHyperlinkComponentProps extends IComponentProps {
	/**
	 *  the format of text: it should be wrapped in "<>", eg. <https://github.com/>
	 */
	text: string;
	onClick?: Parameters<IHyperlink["OnClick"]>[0];
}

class HyperlinkComponent extends AveComponent<IHyperlinkComponentProps> {
	static tagName = "ave-hyperlink";

	private hyperlink: NativeHyperlink;

	protected onCreateUI() {
		this.hyperlink = new NativeHyperlink(this.window, this.props?.langKey);
		return this.hyperlink;
	}

	protected onUpdateProp(propName: keyof IHyperlinkComponentProps, propValue: any) {
		switch (propName) {
			case "text": {
				this.hyperlink.SetText(propValue ?? "<blank>");
				break;
			}

			case "onClick": {
				this.hyperlink.OnClick(propValue ?? (() => {}));
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = HyperlinkComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new HyperlinkComponent(initProps);
	}
}

export const Hyperlink = registerComponent<IHyperlinkComponentProps>(new Config());
