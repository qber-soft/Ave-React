import { ComboBox as NativeComboBox } from "ave-ui";
import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";

export interface IComboBoxComponentProps extends IComponentProps {
	options: IComboBoxOption[];
}

export interface IComboBoxOption {
	key: string;
	text: string;
}

class ComboBoxComponent extends AveComponent<IComboBoxComponentProps> {
	static tagName = "ave-combo-box";

	private comboBox: NativeComboBox;
	private options: IComboBoxOption[];

	protected onCreateUI() {
		this.comboBox = new NativeComboBox(this.window);
		this.options = [];
		return this.comboBox;
	}

	protected onUpdateProp(propName: keyof IComboBoxComponentProps, propValue: any) {
		switch (propName) {
			case "options": {
				this.updateOptions(propValue ?? []);
				break;
			}
		}
	}

	private updateOptions(newOptions: IComboBoxOption[]) {
		newOptions.forEach((option, index) => {
			const prevOption = this.options[index];
			if (!prevOption) {
				this.comboBox.Insert(option.text, index);
			}
		});

		this.options = [...newOptions];
	}
}

class Config extends ComponentConfig {
	tagName = ComboBoxComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new ComboBoxComponent(initProps);
	}
}

export const ComboBox = registerComponent<IComboBoxComponentProps>(new Config());
