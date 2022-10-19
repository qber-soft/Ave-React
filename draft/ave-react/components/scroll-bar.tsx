import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { ScrollBar as NativeScrollBar } from "ave-ui";

export interface IScrollBarComponentProps extends IComponentProps {
	value: number;
	shrink?: boolean;
	min?: number;
	max?: number;
}

class ScrollBarComponent extends AveComponent<IScrollBarComponentProps> {
	static tagName = "ave-scroll-bar";

	private scrollBar: NativeScrollBar;

	protected onCreateUI() {
		this.scrollBar = new NativeScrollBar(this.window);
		this.scrollBar.SetShrink(false);
		return this.scrollBar;
	}

	protected onUpdateProp(propName: keyof IScrollBarComponentProps, propValue: any) {
		switch (propName) {
			case "value": {
				this.scrollBar.SetValue(propValue ?? 0);
				break;
			}

			case "shrink": {
				this.scrollBar.SetShrink(propValue ?? false);
				break;
			}

			case "min": {
				this.scrollBar.SetMinimum(propValue ?? 0);
				break;
			}

			case "max": {
				this.scrollBar.SetMaximum(propValue ?? 100);
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = ScrollBarComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new ScrollBarComponent(initProps);
	}
}

export const ScrollBar = registerComponent<IScrollBarComponentProps>(new Config());
