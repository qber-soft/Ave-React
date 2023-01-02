import React from "react";
import { Grid, TextBox } from "../../../src/ave-react";
import { clickComponent, imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";
import { keyboard } from "@nut-tree/nut-js";
import { TextBox as NativeTextBox } from "ave-ui";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum TextBoxTestCases {
	MountAndUnMount = "display text box and remove",
	Type = "enter and display text",
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

	test(TextBoxTestCases.Type, async () => {
		TestContext.updateTitle(TextBoxTestCases.Type);

		let nativeTextBox: NativeTextBox = null;
		function TestCase() {
			const onInit = (textBox: NativeTextBox) => {
				nativeTextBox = textBox;
			};

			return (
				<Grid id="root">
					<TextBox text="" onInit={onInit}></TextBox>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		expect(nativeTextBox).not.toEqual(null);

		await clickComponent("root");
		const input = "Ave React";
		await keyboard.type(input);

		const text = nativeTextBox.GetText();
		expect(text).toEqual("abc");
	});
});
