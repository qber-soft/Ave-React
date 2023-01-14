import React, { useEffect, useState } from "react";
import { Grid, Hyperlink } from "../../../src/ave-react";
import { clickComponent, getUpdateFunction, imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";
import { waitFor, WaitForDelay } from "../../common";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum HyperlinkTestCases {
	MountAndUnMount = "display hyperlink and remove",
	// update props
	UpdateText = "update text",
	UpdateOnClick = "update onClick",
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

	test(HyperlinkTestCases.UpdateOnClick, async () => {
		TestContext.updateTitle(HyperlinkTestCases.UpdateOnClick);

		let fireUpdate = null;
		const text = "<Ave React Hyperlink Test onClick>";

		const defaultOnClick = jest.fn((sender) => {
			console.timeEnd("click");
			console.log("default onClick");
			expect(sender.GetText()).toEqual(text);
		});

		const newOnClick = jest.fn((sender) => {
			console.log("new onClick");
			expect(sender.GetText()).toEqual(text);
		});

		function TestCase() {
			const [update, setUpdate] = useState(false);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update onClick`);
					setUpdate(true);
				});
			}, []);

			return (
				<Grid>
					<Hyperlink id="target" text={text} onClick={update ? newOnClick : defaultOnClick}></Hyperlink>
				</Grid>
			);
		}

		//
		await TestContext.render(<TestCase />);

		expect(defaultOnClick).toHaveBeenCalledTimes(0);
		expect(newOnClick).toHaveBeenCalledTimes(0);

		//
		await clickComponent("target");
		console.time("click");
		await waitFor("invoke click callback", WaitForDelay.ClickCallback);

		expect(defaultOnClick).toHaveBeenCalledTimes(1);
		expect(newOnClick).toHaveBeenCalledTimes(0);

		//
		await fireUpdate();
		await clickComponent("target");
		await waitFor("invoke click callback", WaitForDelay.ClickCallback);

		expect(defaultOnClick).toHaveBeenCalledTimes(1);
		expect(newOnClick).toHaveBeenCalledTimes(1);
	});
});
