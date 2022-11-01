import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { Calendar as NativeCalendar } from "ave-ui";

export interface ICalendarComponentProps extends IComponentProps {}

class CalendarComponent extends AveComponent<ICalendarComponentProps> {
	static tagName = "ave-calendar";

	private calendar: NativeCalendar;

	protected onCreateUI() {
		this.calendar = new NativeCalendar(this.window);
		return this.calendar;
	}

	protected onUpdateProp(propName: keyof ICalendarComponentProps, propValue: any) {}
}

class Config extends ComponentConfig {
	tagName = CalendarComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new CalendarComponent(initProps);
	}
}

export const Calendar = registerComponent<ICalendarComponentProps>(new Config());
