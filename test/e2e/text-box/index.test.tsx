import React from "react";
import { Grid, TextBox } from "../../../src/ave-react";
import { imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum TextBoxTestCases {
	MountAndUnMount = "display text box and remove",
	// update props
}

describe("text-box", () => {
	test(TextBoxTestCases.MountAndUnMount, async () => {
		TestContext.updateTitle(TextBoxTestCases.MountAndUnMount);

		function TestCase() {
			return (
				<Grid id="root">
					<TextBox text="TextBox"></TextBox>
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
