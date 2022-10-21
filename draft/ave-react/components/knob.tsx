import { AveComponent, ComponentConfig, IComponentProps, IComponentStyle, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { IKnob, Knob as NativeKnob, Vec4 } from "ave-ui";

export interface IKnobComponentProps extends IComponentProps {
	text: string;
	style?: IKnobStyle;
	onChange?: Parameters<IKnob["OnChange"]>[0];
}

export interface IKnobStyle extends IComponentStyle {
	ringColor?: Vec4;
}

class KnobComponent extends AveComponent<IKnobComponentProps> {
	static tagName = "ave-knob";

	private knob: NativeKnob;

	protected onCreateUI() {
		this.knob = new NativeKnob(this.window, this.props?.langKey);
		return this.knob;
	}

	protected onUpdateProp(propName: keyof IKnobComponentProps, propValue: any) {
		switch (propName) {
			case "text": {
				this.knob.SetText(propValue ?? "");
				break;
			}

			case "style": {
				this.setValueForStyles(propValue);
				break;
			}

			case "onChange": {
				this.knob.OnChange(propValue ?? (() => {}));
				break;
			}
		}
	}

	private setValueForStyles(styles: IKnobStyle = {}) {
		(Object.keys(styles) as Array<keyof IKnobStyle>).forEach((styleName) => {
			switch (styleName) {
				case "ringColor": {
					const color = styles.ringColor ?? new Vec4(0, 0, 0, 255);
					this.knob.RingSetColor(color);
					break;
				}
			}
		});
	}
}

class Config extends ComponentConfig {
	tagName = KnobComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new KnobComponent(initProps);
	}
}

export const Knob = registerComponent<IKnobComponentProps>(new Config());
