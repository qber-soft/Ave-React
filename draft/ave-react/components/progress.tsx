import { ProgressBar as NativeProgress } from "ave-ui";
import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";

export interface IProgressComponentProps extends IComponentProps {
	value: number;
	/**
	 * by default, max is 100
	 */
	max?: number;
}

class ProgressComponent extends AveComponent<IProgressComponentProps> {
	static tagName = "ave-progress";

	private progress: NativeProgress;

	protected onCreateUI() {
		this.progress = new NativeProgress(this.window);
		return this.progress;
	}

	protected onUpdateProp(propName: keyof IProgressComponentProps, propValue: any) {
		switch (propName) {
			case "value": {
				this.progress.SetValue(propValue ?? 0);
				break;
			}
			case "max": {
				this.progress.SetMaximum(propValue ?? 100);
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = ProgressComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new ProgressComponent(initProps);
	}
}

export const Progress = registerComponent<IProgressComponentProps>(new Config());
