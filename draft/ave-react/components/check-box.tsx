import { CheckBox as NativeCheckBox, CheckBoxStyle, ICheckBox } from "ave-ui";
import { AveComponent, ComponentConfig, IComponentProps, IComponentStyle, registerComponent } from "../components";
import { AppContainer } from "../renderer";

export interface ICheckBoxComponentProps extends IComponentProps {
	text: string;
	style?: ICheckBoxStyle;
	onCheck?: Parameters<ICheckBox["OnCheck"]>[0];
	onChecking?: Parameters<ICheckBox["OnChecking"]>[0];
}

export interface ICheckBoxStyle extends IComponentStyle {
	visualStyle?: CheckBoxStyle;
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
			case "onCheck": {
				this.checkBox.OnCheck(propValue ?? (() => {}));
				break;
			}
			case "onChecking": {
				this.checkBox.OnChecking(propValue ?? (() => {}));
				break;
			}
			case "style": {
				this.setValueForStyles(propValue);
				break;
			}
		}
	}

	private setValueForStyles(styles: ICheckBoxStyle = {}) {
		(Object.keys(styles) as Array<keyof ICheckBoxStyle>).forEach((styleName) => {
			switch (styleName) {
				case "visualStyle": {
					const style = styles.visualStyle ?? CheckBoxStyle.Checking;
					this.checkBox.SetCheckBoxStyle(style);
					break;
				}
			}
		});
	}
}

class Config extends ComponentConfig {
	tagName = CheckBoxComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new CheckBoxComponent(initProps);
	}
}

export const CheckBox = registerComponent<ICheckBoxComponentProps>(new Config());
