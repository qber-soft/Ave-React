import React, { useState } from "react";
import { Window, Calendar } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestCalendarSet() {
	const [date, setDate] = useState(new Date(2021, 11, 5).getTime());
	const [dateMark, setDateMark] = useState(new Date(2021, 11, 5).getTime());

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
