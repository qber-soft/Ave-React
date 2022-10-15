import { ComboBox as NativeComboBox, IComboBox } from "ave-ui";
import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";

export interface IComboBoxComponentProps extends IComponentProps {
	options: IComboBoxOption[];
	defaultSelectedKey?: string;
	onChange?: Parameters<IComboBox["OnSelectionChange"]>[0];
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

			case "defaultSelectedKey": {
				const index = this.options.findIndex((each) => each.key === propValue);
				if (index !== -1) {
					this.comboBox.Select(index);
				}
				break;
			}

			case "onChange": {
				this.comboBox.OnSelectionChange(propValue ?? (() => {}));
				break;
			}
		}
	}

	private updateOptions(newOptions: IComboBoxOption[]) {
		newOptions.forEach((option, index) => {
			const prevOption = this.options[index];
			if (!prevOption) {
				this.comboBox.Insert(option.text, index);
			} else {
				const prevKey = prevOption?.key;
				const currKey = option?.key;
				if (prevKey === currKey) {
					if (prevOption?.text !== option?.text) {
						this.comboBox.Set(index, option.text);
					}
					// else skip it
				} else {
					this.comboBox.Remove(index);
					this.comboBox.Insert(option.text, index);
				}
			}
		});

		if (newOptions.length < this.options.length) {
			for (let i = this.options.length - 1; i >= newOptions.length; --i) {
				this.comboBox.Remove(i);
			}
		}

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
