import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "./common";
import { AppContainer } from "../renderer";
import { IControl, Placeholder as NativePlaceholder } from "ave-ui";

export interface IPlaceholderComponentProps extends IComponentProps {
	onPaintPost?: Parameters<IControl["OnPaintPost"]>[0];
	onPointerEnter?: Parameters<IControl["OnPointerEnter"]>[0];
	onPointerLeave?: Parameters<IControl["OnPointerLeave"]>[0];
	onPointerPress?: Parameters<IControl["OnPointerPress"]>[0];
	onPointerRelease?: Parameters<IControl["OnPointerRelease"]>[0];
	onPointerMove?: Parameters<IControl["OnPointerMove"]>[0];
}

class PlaceholderComponent extends AveComponent<IPlaceholderComponentProps> {
	static tagName = "ave-placeholder";

	private placeholder: NativePlaceholder;

	protected onCreateUI() {
		this.placeholder = new NativePlaceholder(this.window);
		return this.placeholder;
	}

	protected onUpdateProp(propName: keyof IPlaceholderComponentProps, propValue: any) {
		switch (propName) {
			case "onPaintPost": {
				this.placeholder.OnPaintPost(propValue ?? (() => {}));
				break;
			}
			case "onPointerEnter": {
				this.placeholder.OnPointerEnter(propValue ?? (() => {}));
				break;
			}
			case "onPointerLeave": {
				this.placeholder.OnPointerLeave(propValue ?? (() => {}));
				break;
			}
			case "onPointerPress": {
				this.placeholder.OnPointerPress(propValue ?? (() => {}));
				break;
			}
			case "onPointerRelease": {
				this.placeholder.OnPointerRelease(propValue ?? (() => {}));
				break;
			}
			case "onPointerMove": {
				this.placeholder.OnPointerMove(propValue ?? (() => {}));
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = PlaceholderComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new PlaceholderComponent(initProps);
	}
}

export const Placeholder = registerComponent<IPlaceholderComponentProps>(new Config());
