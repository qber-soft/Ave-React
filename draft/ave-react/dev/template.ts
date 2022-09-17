import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";

export interface ITemplateComponentProps extends IComponentProps {
	desc: string;
}

class TemplateComponent extends AveComponent<ITemplateComponentProps> {
	static tagName = "ave-template";

	protected onCreateUI() {
		throw new Error("Method not implemented.");
		return null;
	}

	protected onUpdateProp(propName: keyof ITemplateComponentProps, propValue: any) {
		throw new Error("Method not implemented.");
	}
}

class Config extends ComponentConfig {
	tagName = TemplateComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new TemplateComponent(initProps);
	}
}

export const Template = registerComponent<ITemplateComponentProps>(new Config());
