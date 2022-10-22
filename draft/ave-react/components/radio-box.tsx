import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { IRadioBox, RadioBox as NativeRadioBox } from "ave-ui";

export interface IRadioBoxComponentProps extends IComponentProps {
	text: string;
	value?: boolean;
	onCheck?: Parameters<IRadioBox["OnCheck"]>[0];
}

class RadioBoxComponent extends AveComponent<IRadioBoxComponentProps> {
	static tagName = "ave-radio-box";

	private radioBox: NativeRadioBox;

	protected onCreateUI() {
		this.radioBox = new NativeRadioBox(this.window, this.props?.langKey);
		return this.radioBox;
	}

	protected onUpdateProp(propName: keyof IRadioBoxComponentProps, propValue: any) {
		switch (propName) {
			case "text": {
				this.radioBox.SetText(propValue ?? "");
				break;
			}

			case "value": {
				this.radioBox.SetValue(propValue ?? false);
				break;
			}

			case "onCheck": {
				this.radioBox.OnCheck(propValue ?? (() => {}));
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = RadioBoxComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new RadioBoxComponent(initProps);
	}
}

export const RadioBox = registerComponent<IRadioBoxComponentProps>(new Config());
