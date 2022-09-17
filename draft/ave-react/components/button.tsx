import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "./common";
import { AppContainer, getAppContext } from "../renderer";
import { Button as NativeButton, IconSource, VisualTextLayout } from "ave-ui";

export interface IButtonComponentProps extends IComponentProps {
	text?: string;
	iconInfo?: { name: string; size?: number };
	onClick?: (sender: NativeButton) => void;
}

class ButtonComponent extends AveComponent<IButtonComponentProps> {
	static tagName = "ave-button";

	private button: NativeButton;

	protected onCreateUI() {
		this.button = new NativeButton(this.window, this.props?.langKey);
		this.button.SetVisualTextLayout(VisualTextLayout.HorzVisualText);
		return this.button;
	}

	protected onUpdateProp(propName: keyof IButtonComponentProps, propValue: any) {
		switch (propName) {
			case "text": {
				this.button.SetText(propValue);
				break;
			}

			case "iconInfo": {
				const context = getAppContext();
				const resMap = context.getIconResourceMap();
				const { name, size = 16 } = propValue ?? { name: "", size: 16 };
				this.button.SetVisual(this.window.CreateManagedIcon(new IconSource(resMap[name], size)));
				break;
			}

			case "onClick": {
				this.button.OnClick(propValue ?? (() => {}));
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = ButtonComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new ButtonComponent(initProps);
	}
}

export const Button = registerComponent<IButtonComponentProps>(new Config());
