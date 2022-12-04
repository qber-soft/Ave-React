import React from "react";
import { Button, Grid } from "../../../src/ave-react";
import { imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum ButtonTestCases {
	MountAndUnMount = "display button and remove",
	// update props
}

describe("button", () => {
	test(ButtonTestCases.MountAndUnMount, async () => {
		TestContext.updateTitle(ButtonTestCases.MountAndUnMount);

		function TestCase() {
			return (
				<Grid id="root">
					<Button text="Button"></Button>
				</Grid>
			);
		}

		{
			await TestContext.render(<TestCase />);
			const components = getComponents();
			expect(components.length).toEqual(TestContext.defaultComponentCount + 2);
			await imageSnapshotTest("root");
		}

		{
			await TestContext.render(<Grid id="root"></Grid>);
			const components = getComponents();
			expect(components.length).toEqual(TestContext.defaultComponentCount + 1);
			await imageSnapshotTest("root");
		}
	});
});
