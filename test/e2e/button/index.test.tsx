import React, { useEffect, useState } from "react";
import { Button, Grid } from "../../../src/ave-react";
import { getUpdateFunction, imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum ButtonTestCases {
	MountAndUnMount = "display button and remove",
	// update props
	UpdateText = "update text",
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

	test(ButtonTestCases.UpdateText, async () => {
		TestContext.updateTitle(ButtonTestCases.UpdateText);

		let fireUpdate = null;
		function TestCase() {
			const [text, setText] = useState("Button");

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update text`);
					setText("Update");
				});
			}, []);
			return (
				<Grid id="root">
					<Button text={text}></Button>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});
});
