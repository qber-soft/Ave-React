import { TimePoint } from "ave-ui";
import React, { useState } from "react";
import { Window, Calendar } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestCalendarSet() {
	const timestamp = new TimePoint(2021, 11, 5).JsDateTime;
	const [date, setDate] = useState(timestamp);
	const [dateMark, setDateMark] = useState(timestamp);

	return (
		<Window title="Calendar Set">
			<DemoLayout width="500dpx" height="500dpx">
				<Calendar
					date={date}
					dateMark={dateMark}
					onChange={(sender) => {
						const timePoint = sender.GetDate();
						const timestamp = timePoint.JsDateTime;
						setDate(timestamp);
						setDateMark(timestamp);
					}}
				></Calendar>
			</DemoLayout>
		</Window>
	);
}
