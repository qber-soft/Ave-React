import React, { useEffect, useState } from "react";
import { Calendar, Grid } from "../../../src/ave-react";
import { getUpdateFunction, imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";
import { TimePoint } from "ave-ui";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum CalendarTestCases {
	MountAndUnMount = "display calendar and remove",
	// update props
	UpdateDate = "update date",
	UpdateDateMark = "update date mark",
}

describe("calendar", () => {
	test(CalendarTestCases.MountAndUnMount, async () => {
		TestContext.updateTitle(CalendarTestCases.MountAndUnMount);
		TestContext.updateLayout("400dpx", "400dpx");

		function TestCase() {
			return (
				<Grid id="root">
					<Calendar></Calendar>
				</Grid>
			);
		}

		{
			await TestContext.render(<TestCase />);
			const components = getComponents();
			expect(components.length).toEqual(TestContext.defaultComponentCount + 2);
			// date is not fixed, snapshot is not necessary
			// await imageSnapshotTest("root");
		}

		{
			await TestContext.render(<Grid id="root"></Grid>);
			const components = getComponents();
			expect(components.length).toEqual(TestContext.defaultComponentCount + 1);
			// await imageSnapshotTest("root");
		}
	});

	test(CalendarTestCases.UpdateDate, async () => {
		TestContext.updateTitle(CalendarTestCases.UpdateDate);
		TestContext.updateLayout("400dpx", "400dpx");

		let fireUpdate = null;
		function TestCase() {
			const timestamp = new TimePoint(2021, 11, 5).JsDateTime;
			const [date, setDate] = useState(timestamp);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					const timestamp = new TimePoint(2022, 1, 29).JsDateTime;
					setDate(timestamp);
				});
			}, []);
			return (
				<Grid id="root">
					<Calendar date={date}></Calendar>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(CalendarTestCases.UpdateDateMark, async () => {
		TestContext.updateTitle(CalendarTestCases.UpdateDateMark);
		TestContext.updateLayout("400dpx", "400dpx");

		let fireUpdate = null;
		function TestCase() {
			const timestamp = new TimePoint(2021, 11, 5).JsDateTime;
			const [date, setDate] = useState(timestamp);
			const [dateMark, setDateMark] = useState(timestamp);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					const date = new TimePoint(2022, 1, 29).JsDateTime;
					setDate(date);

					const dateMark = new TimePoint(2022, 1, 15).JsDateTime;
					setDateMark(dateMark);
				});
			}, []);
			return (
				<Grid id="root">
					<Calendar date={date} dateMark={dateMark}></Calendar>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});
});
