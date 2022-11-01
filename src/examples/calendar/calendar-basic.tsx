import React from "react";
import { Window, Calendar } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestCalendarBasic() {
	return (
		<Window title="Calendar Basic">
			<DemoLayout width="500dpx" height="500dpx">
				<Calendar
					onChange={(sender) => {
						const timePoint = sender.GetDate();
						console.log(`Date: ${timePoint.Year}-${timePoint.Month}-${timePoint.Day}`);
					}}
				></Calendar>
			</DemoLayout>
		</Window>
	);
}
