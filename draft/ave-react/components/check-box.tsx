import { CheckBox as NativeCheckBox } from "ave-ui";
import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";

export interface ICheckBoxComponentProps extends IComponentProps {
	text: string;
}

class CheckBoxComponent extends AveComponent<ICheckBoxComponentProps> {
	static tagName = "ave-check-box";

	private checkBox: NativeCheckBox;

	protected onCreateUI() {
		this.checkBox = new NativeCheckBox(this.window, this.props?.langKey);
		return this.checkBox;
	}

	protected onUpdateProp(propName: keyof ICheckBoxComponentProps, propValue: any) {
		switch (propName) {
			case "text": {
				this.checkBox.SetText(propValue ?? "");
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = CheckBoxComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new CheckBoxComponent(initProps);
	}
}

export const CheckBox = registerComponent<ICheckBoxComponentProps>(new Config());
