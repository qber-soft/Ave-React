import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { ITextBox, TextBox as NativeTextBox } from "ave-ui";

export interface ITextBoxComponentProps extends IComponentProps {
	text?: string;
	readonly?: boolean;
	border?: boolean;
	onChange?: Parameters<ITextBox["OnChange"]>[0];
}

class TextBoxComponent extends AveComponent<ITextBoxComponentProps> {
	static tagName = "ave-text-box";

	private textBox: NativeTextBox;

	protected onCreateUI() {
		this.textBox = new NativeTextBox(this.window, this.props?.langKey);
		return this.textBox;
	}

	protected onUpdateProp(propName: keyof ITextBoxComponentProps, propValue: any) {
		switch (propName) {
			case "text": {
				this.textBox.SetText(propValue ?? "");
				break;
			}

			case "readonly": {
				this.textBox.SetReadOnly(propValue ?? false);
				break;
			}

			case "border": {
				this.textBox.SetBorder(propValue ?? true);
				break;
			}

			case "onChange": {
				this.textBox.OnChange(propValue ?? (() => {}));
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = TextBoxComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new TextBoxComponent(initProps);
	}
}

export const TextBox = registerComponent<ITextBoxComponentProps>(new Config());
