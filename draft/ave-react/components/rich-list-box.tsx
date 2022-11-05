import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { RichListBox as NativeRichListBox } from "ave-ui";

export interface IRichListBoxComponentProps extends IComponentProps {}

class RichListBoxComponent extends AveComponent<IRichListBoxComponentProps> {
	static tagName = "ave-rich-list-box";

	private richListBox: NativeRichListBox;

	protected onCreateUI() {
		this.richListBox = new NativeRichListBox(this.window);
		return this.richListBox;
	}

	protected onUpdateProp(propName: keyof IRichListBoxComponentProps, propValue: any) {}
}

class Config extends ComponentConfig {
	tagName = RichListBoxComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new RichListBoxComponent(initProps);
	}
}

export const RichListBox = registerComponent<IRichListBoxComponentProps>(new Config());
