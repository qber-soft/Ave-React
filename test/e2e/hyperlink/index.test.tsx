import React from "react";
import { Grid, Hyperlink } from "../../../src/ave-react";
import { imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum HyperlinkTestCases {
	MountAndUnMount = "display hyperlink and remove",
	// update props
}

describe("label", () => {
	test(HyperlinkTestCases.MountAndUnMount, async () => {
		TestContext.updateTitle(HyperlinkTestCases.MountAndUnMount);

		function TestCase() {
			return (
				<Grid id="root">
					<Hyperlink text="<Ave React>"></Hyperlink>
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
