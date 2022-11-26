import { AveComponent, ComponentConfig, IComponentProps, IComponentStyle, registerComponent } from "./common";
import { AppContainer, getAppContext } from "../renderer";
import { Button as NativeButton, ButtonStyle, IButton, IconSource, Vec4, VisualTextLayout } from "ave-ui";

export interface IButtonComponentProps extends IComponentProps {
	text?: string;
	style?: IButtonStyle;
	iconInfo?: { name: string; size?: number };
	onClick?: Parameters<IButton["OnClick"]>[0];
}

export interface IButtonStyle extends IComponentStyle {
	color?: Vec4;
	visualStyle?: ButtonStyle;
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
				this.button.SetText(propValue ?? "");
				break;
			}

			case "style": {
				this.setValueForStyles(propValue);
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

	private setValueForStyles(styles: IButtonStyle = {}) {
		(Object.keys(styles) as Array<keyof IButtonStyle>).forEach((styleName) => {
			switch (styleName) {
				case "color": {
					const color = styles.color ?? new Vec4(0, 0, 0, 255);
					this.button.SetTextColor(color);
					break;
				}

				case "visualStyle": {
					const style = styles.visualStyle ?? ButtonStyle.Push;
					this.button.SetButtonStyle(style);
					break;
				}
			}
		});
	}
}

class Config extends ComponentConfig {
	tagName = ButtonComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new ButtonComponent(initProps);
	}
}

export const Button = registerComponent<IButtonComponentProps>(new Config());
