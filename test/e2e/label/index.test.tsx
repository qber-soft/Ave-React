import React from "react";
import { Grid, Label } from "../../../src/ave-react";
import { imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum LabelTestCases {
	MountAndUnMount = "display label and remove",
	// update props
}

describe("label", () => {
	test(LabelTestCases.MountAndUnMount, async () => {
		TestContext.updateTitle(LabelTestCases.MountAndUnMount);

		function TestCase() {
			return (
				<Grid id="root">
					<Label text="Label"></Label>
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
