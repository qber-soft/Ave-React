import React from "react";
import { Window, DatePicker } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestDatePickerBasic() {
	return (
		<Window title="DatePicker Basic">
			<DemoLayout width="250dpx">
				<DatePicker
					onChange={(sender) => {
						const timePoint = sender.GetDate();
						console.log(`Date: ${timePoint.Year}-${timePoint.Month}-${timePoint.Day}`);
					}}
				></DatePicker>
			</DemoLayout>
		</Window>
	);
}
