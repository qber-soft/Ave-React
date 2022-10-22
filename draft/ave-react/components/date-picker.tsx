import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { DatePicker as NativeDatePicker, IDatePicker } from "ave-ui";

export interface IDatePickerComponentProps extends IComponentProps {
	onChange?: Parameters<IDatePicker["OnChange"]>[0];
}

class DatePickerComponent extends AveComponent<IDatePickerComponentProps> {
	static tagName = "ave-date-picker";

	private datePicker: NativeDatePicker;

	protected onCreateUI() {
		this.datePicker = new NativeDatePicker(this.window);
		return this.datePicker;
	}

	protected onUpdateProp(propName: keyof IDatePickerComponentProps, propValue: any) {
		switch (propName) {
			case "onChange": {
				this.datePicker.OnChange(propValue ?? (() => {}));
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = DatePickerComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new DatePickerComponent(initProps);
	}
}

export const DatePicker = registerComponent<IDatePickerComponentProps>(new Config());
