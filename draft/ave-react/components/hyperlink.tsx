import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from ".";
import { AppContainer } from "../renderer";
import { Hyperlink as NativeHyperlink } from "ave-ui";

export interface IHyperlinkComponentProps extends IComponentProps {
	text: string;
}

class HyperlinkComponent extends AveComponent<IHyperlinkComponentProps> {
	static tagName = "ave-hyper-link";

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
