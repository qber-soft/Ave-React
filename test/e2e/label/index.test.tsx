import React, { useEffect, useState } from "react";
import { Grid, Label } from "../../../src/ave-react";
import { getUpdateFunction, imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";
import { Color } from "../../common";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum LabelTestCases {
	MountAndUnMount = "display label and remove",
	// update props
	UpdateText = "update text",
	UpdateColor = "update color",
	UpdateBackgroundColor = "update background color",
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

	test(LabelTestCases.UpdateText, async () => {
		TestContext.updateTitle(LabelTestCases.UpdateText);

		let fireUpdate = null;
		function TestCase() {
			const [text, setText] = useState("Label");

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update text`);
					setText("Update");
				});
			}, []);
			return (
				<Grid id="root">
					<Label text={text}></Label>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(LabelTestCases.UpdateColor, async () => {
		TestContext.updateTitle(LabelTestCases.UpdateColor);

		let fireUpdate = null;
		function TestCase() {
			const [color, setColor] = useState(Color.Blue);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update color`);
					setColor(Color.Red);
				});
			}, []);
			return (
				<Grid id="root">
					<Label text="Label" style={{ color }}></Label>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(LabelTestCases.UpdateBackgroundColor, async () => {
		TestContext.updateTitle(LabelTestCases.UpdateBackgroundColor);

		let fireUpdate = null;
		function TestCase() {
			const [color, setColor] = useState(Color.Blue);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update background color`);
					setColor(Color.Red);
				});
			}, []);
			return (
				<Grid id="root">
					<Label text="Label" style={{ backgroundColor: color }}></Label>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});
});
