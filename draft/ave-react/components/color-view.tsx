import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { ColorView as NativeColorView, Vec4 } from "ave-ui";

export interface IColorViewComponentProps extends IComponentProps {
	solidColor?: Vec4;
}

class ColorViewComponent extends AveComponent<IColorViewComponentProps> {
	static tagName = "ave-color-view";

	private colorView: NativeColorView;

	protected onCreateUI() {
		this.colorView = new NativeColorView(this.window);
		return this.colorView;
	}

	protected onUpdateProp(propName: keyof IColorViewComponentProps, propValue: any) {
		switch (propName) {
			case "solidColor": {
				this.colorView.SetSolidColor(propValue ?? new Vec4(0, 0, 0, 0));
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = ColorViewComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new ColorViewComponent(initProps);
	}
}

export const ColorView = registerComponent<IColorViewComponentProps>(new Config());
