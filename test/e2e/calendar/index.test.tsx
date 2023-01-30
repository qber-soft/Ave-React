import React from "react";
import { Calendar, Grid } from "../../../src/ave-react";
import { setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum CalendarTestCases {
	MountAndUnMount = "display calendar and remove",
	// update props
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
});
