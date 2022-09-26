import { AveComponent, ComponentConfig, IComponentProps, IComponentStyle, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { AlignType, Label as NativeLabel, Vec4 } from "ave-ui";

export interface ILabelComponentProps extends IComponentProps {
	text?: string;
	style?: ILabelStyle;
}

export interface ILabelStyle extends IComponentStyle {
	backgroundColor?: Vec4;
	color?: Vec4;
	horizontalAlign?: AlignType
}

class LabelComponent extends AveComponent<ILabelComponentProps> {
	static tagName = "ave-label";

	private label: NativeLabel;

	protected onCreateUI() {
		this.label = new NativeLabel(this.window, this.props?.langKey);
		return this.label;
	}

	protected onUpdateProp(propName: keyof ILabelComponentProps, propValue: any) {
		switch (propName) {
			case "style": {
				this.setValueForStyles(propValue);
				break;
			}
			case "text": {
				this.label.SetText(propValue);
				break;
			}
		}
	}

	private setValueForStyles(styles: ILabelStyle = {}) {
		(Object.keys(styles) as Array<keyof ILabelStyle>).forEach((styleName) => {
			switch (styleName) {
				case "backgroundColor": {
					const color = styles.backgroundColor ?? new Vec4(255, 255, 255, 255);
					this.label.SetBackColor(color);
					break;
				}
				case "horizontalAlign": {
					const alignType = styles.horizontalAlign ?? AlignType.Near;
					this.label.SetAlignHorz(alignType);
					break;
				}
				case "color": {
					const color = styles.color ?? new Vec4(0, 0, 0, 255);
					this.label.SetTextColor(color);
					break;
				}
			}
		});
	}
}

class Config extends ComponentConfig {
	tagName = LabelComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new LabelComponent(initProps);
	}
}

export const Label = registerComponent<ILabelComponentProps>(new Config());
