import { TimePoint } from "ave-ui";
import React, { useState } from "react";
import { Calendar, Grid, TextBox } from "../../src/ave-react";
import { setupJest, TestContext, waitForTestEnd } from "./common";

setupJest();

describe("manual test", () => {
	test("TextBox: IME", async () => {
		TestContext.updateTitle("test textbox ime");

		function TestCase() {
			return (
				<Grid id="root">
					<TextBox ime></TextBox>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await waitForTestEnd();
	});

	test("Calendar: default", async () => {
		TestContext.updateTitle("test default calendar date");
		TestContext.updateLayout("400dpx", "400dpx");

		function TestCase() {
			return (
				<Grid id="root">
					<Calendar></Calendar>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await waitForTestEnd();
	});

	test("Calendar: onChange", async () => {
		TestContext.updateTitle("test calendar onChange event");
		TestContext.updateLayout("400dpx", "400dpx");

		function TestCase() {
			const timestamp = new TimePoint(2021, 11, 5).JsDateTime;
			const [date, setDate] = useState(timestamp);
			const [dateMark, setDateMark] = useState(timestamp);

			return (
				<Grid id="root">
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
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await waitForTestEnd();
	});
});
