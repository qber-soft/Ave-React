import React, { useState } from "react";
import { Window, DatePicker } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestDatePickerSet() {
	const [date, setDate] = useState(Date.now());
	const [dateMark, setDateMark] = useState(Date.now());

	return (
		<Window title="DatePicker Set">
			<DemoLayout width="250dpx">
				<DatePicker
					date={date}
					dateMark={dateMark}
					onChange={(sender) => {
						const timePoint = sender.GetDate();
						const timestamp = timePoint.JsDateTime;
						setDate(timestamp);
						setDateMark(timestamp);
					}}
				></DatePicker>
			</DemoLayout>
		</Window>
	);
}
