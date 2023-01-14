import React, { useEffect, useState } from "react";
import { Grid, Hyperlink } from "../../../src/ave-react";
import { getUpdateFunction, imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum HyperlinkTestCases {
	MountAndUnMount = "display hyperlink and remove",
	// update props
	UpdateText = "update text",
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

	test(HyperlinkTestCases.UpdateText, async () => {
		TestContext.updateTitle(HyperlinkTestCases.UpdateText);

		let fireUpdate = null;
		function TestCase() {
			const [text, setText] = useState("<Ave Nodejs>");

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update text`);
					setText("<Ave React>");
				});
			}, []);
			return (
				<Grid id="root">
					<Hyperlink text={text}></Hyperlink>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});
});
