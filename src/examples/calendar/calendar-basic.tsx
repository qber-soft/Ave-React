import React from "react";
import { Window, Calendar } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestCalendarBasic() {
	return (
		<Window title="Calendar Basic">
			<DemoLayout width="500dpx" height="500dpx">
				<Calendar></Calendar>
			</DemoLayout>
		</Window>
	);
}
