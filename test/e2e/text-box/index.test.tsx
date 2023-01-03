import React, { useEffect, useState } from "react";
import { Grid, TextBox } from "../../../src/ave-react";
import { clickComponent, getUpdateFunction, imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";
import { keyboard } from "@nut-tree/nut-js";
import { TextBox as NativeTextBox } from "ave-ui";
import { waitFor } from "../../common";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum TextBoxTestCases {
	MountAndUnMount = "display text box and remove",
	Type = "enter and display text",
	// update props
	UpdateText = "update text",
	UpdateReadOnly = "update readonly",
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
		await waitFor("enter text", 100);

		const text = nativeTextBox.GetText();
		expect(text).toEqual(input);
	});

	test(TextBoxTestCases.UpdateReadOnly, async () => {
		TestContext.updateTitle(TextBoxTestCases.UpdateReadOnly);

		let nativeTextBox: NativeTextBox = null;
		const defaultText = "Default";

		let fireUpdate = null;
		function TestCase() {
			const [readonly, setReadOnly] = useState(true);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update readonly`);
					setReadOnly(false);
				});
			}, []);

			const onInit = (textBox: NativeTextBox) => {
				nativeTextBox = textBox;
			};

			return (
				<Grid id="root">
					<TextBox text={defaultText} readonly={readonly} onInit={onInit}></TextBox>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");
		expect(nativeTextBox).not.toEqual(null);

		await clickComponent("root");
		const input = " Update";
		await keyboard.type(input);
		await waitFor("enter text", 100);

		const text = nativeTextBox.GetText();
		expect(text).not.toEqual(input);
		expect(text).toEqual(defaultText);

		//
		await fireUpdate();
		await clickComponent("root");
		await keyboard.type(input);
		await waitFor("enter text", 100);

		const textUpdated = nativeTextBox.GetText();
		expect(textUpdated).toEqual(`${defaultText}${input}`);
	});

	test(TextBoxTestCases.UpdateText, async () => {
		TestContext.updateTitle(TextBoxTestCases.UpdateText);

		let fireUpdate = null;
		function TestCase() {
			const [text, setText] = useState("TextBox");

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update text`);
					setText("Update");
				});
			}, []);
			return (
				<Grid id="root">
					<TextBox text={text}></TextBox>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});
});
