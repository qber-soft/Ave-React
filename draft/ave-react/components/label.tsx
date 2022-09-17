import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { Label as NativeLabel } from "ave-ui";

export interface ILabelComponentProps extends IComponentProps {
	text?: string;
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
			case "text": {
				this.label.SetText(propValue);
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = LabelComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new LabelComponent(initProps);
	}
}

export const Label = registerComponent<ILabelComponentProps>(new Config());
