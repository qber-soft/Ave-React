import React, { useEffect, useState } from "react";
import { Button, Grid } from "../../../src/ave-react";
import { clickComponent, getUpdateFunction, imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";
import { Color, waitFor, WaitForDelay } from "../../common";
import { ButtonStyle } from "ave-ui";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum ButtonTestCases {
	MountAndUnMount = "display button and remove",
	// update props
	UpdateText = "update text",
	UpdateColor = "update color",
	UpdateVisualStyle = "update visual style",
	UpdateIcon = "update icon",
	UpdateOnClick = "update onClick",
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

	test(ButtonTestCases.UpdateColor, async () => {
		TestContext.updateTitle(ButtonTestCases.UpdateColor);

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
					<Button text="Button" style={{ color }}></Button>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(ButtonTestCases.UpdateVisualStyle, async () => {
		TestContext.updateTitle(ButtonTestCases.UpdateVisualStyle);

		let fireUpdate = null;
		function TestCase() {
			const [visualStyle, setVisualStyle] = useState(ButtonStyle.Command);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update visual style`);
					setVisualStyle(ButtonStyle.Push);
				});
			}, []);
			return (
				<Grid id="root">
					<Button text="Button" style={{ visualStyle }}></Button>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(ButtonTestCases.UpdateIcon, async () => {
		TestContext.updateTitle(ButtonTestCases.UpdateIcon);

		let fireUpdate = null;
		function TestCase() {
			const [iconInfo, setIconInfo] = useState({ name: "open-file", size: 16 });

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update icon info`);
					setIconInfo({ name: "open-recent", size: 16 });
				});
			}, []);
			return (
				<Grid id="root">
					<Button text="Button" iconInfo={iconInfo}></Button>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(ButtonTestCases.UpdateOnClick, async () => {
		TestContext.updateTitle(ButtonTestCases.UpdateOnClick);

		let fireUpdate = null;

		const defaultOnClick = jest.fn((sender) => {
			console.timeEnd("click");
			console.log("default onClick");
			expect(sender.GetText()).toEqual("Click");
		});

		const newOnClick = jest.fn((sender) => {
			console.log("new onClick");
			expect(sender.GetText()).toEqual("Click");
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
					<Button id="target" text="Click" onClick={update ? newOnClick : defaultOnClick}></Button>
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
		await waitFor("invoke click callback", WaitForDelay.ClickCallback); // wait, because callback is not invoked immediately

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
