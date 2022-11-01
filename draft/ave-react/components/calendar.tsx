import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { Calendar as NativeCalendar, ICalendar, TimePoint } from "ave-ui";

export interface ICalendarComponentProps extends IComponentProps {
	/**
	 * js timestamp
	 */
	date?: number;
	dateMark?: number;
	onChange?: Parameters<ICalendar["OnChange"]>[0];
}

class CalendarComponent extends AveComponent<ICalendarComponentProps> {
	static tagName = "ave-calendar";

	private calendar: NativeCalendar;

	protected onCreateUI() {
		this.calendar = new NativeCalendar(this.window);
		return this.calendar;
	}

	protected onUpdateProp(propName: keyof ICalendarComponentProps, propValue: any) {
		switch (propName) {
			case "date": {
				const date = TimePoint.FromJsDateTime(propValue ?? 0);
				this.calendar.SetDate(date);
				break;
			}

			case "dateMark": {
				const date = TimePoint.FromJsDateTime(propValue ?? 0);
				this.calendar.SetDateMark(date);
				break;
			}
			case "onChange": {
				this.calendar.OnChange(propValue ?? (() => {}));
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = CalendarComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new CalendarComponent(initProps);
	}
}

export const Calendar = registerComponent<ICalendarComponentProps>(new Config());
