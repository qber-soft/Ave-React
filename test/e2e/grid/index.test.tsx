import { Vec4, Window as NativeWindow } from "ave-ui";
import React from "react";
import { AveRenderer, Grid } from "../../../src/ave-react";
import { getComponentById, getComponents } from "../../ave-testing";
import { waitFor } from "../../common";
import { findWindowByTitle, focusWindow, getRegionRelativeToScreenForComponent, TestContext, TestWindow } from "../common";
import { centerOf, screen, Window as NutjsWindow } from "@nut-tree/nut-js";

jest.setTimeout(60 * 1000);

let nativeWindow: NativeWindow = null;
let activeWindow: NutjsWindow = null;

beforeAll(async () => {
	AveRenderer.render(<TestWindow />);
	await waitFor("window ready", 1000);

	nativeWindow = TestContext.begin();
	await waitFor("window active", 1000);

	activeWindow = await findWindowByTitle(TestContext.defaultWindowTitle);
	await focusWindow(activeWindow);
});

afterEach(async () => {
	// await waitFor("[debug only] review test result", 3000);
	TestContext.render(<></>);
});

afterAll(() => {
	TestContext.end();
});

enum GridTestCases {
	BackgroundColor = "display grid with background color",
	MountAndUnMount = "display grid and remove",
}

describe("grid", () => {
	test(GridTestCases.MountAndUnMount, async () => {
		TestContext.updateTitle(GridTestCases.MountAndUnMount);

		function TestCase() {
			return <Grid id="root" style={{ backgroundColor: new Vec4(0, 255, 0, 255) }}></Grid>;
		}

		{
			const components = getComponents();
			expect(components.length).toEqual(TestContext.defaultComponentCount);
		}

		{
			TestContext.render(<TestCase />);
			await waitFor("render", 1000);
			const components = getComponents();
			expect(components.length).toEqual(TestContext.defaultComponentCount + 1);
		}

		{
			TestContext.render(<></>);
			const components = getComponents();
			expect(components.length).toEqual(TestContext.defaultComponentCount);
		}
	});

	test(GridTestCases.BackgroundColor, async () => {
		TestContext.updateTitle(GridTestCases.BackgroundColor);

		function TestCase() {
			return <Grid id="root" style={{ backgroundColor: new Vec4(0, 0, 255, 255) }}></Grid>;
		}

		TestContext.render(<TestCase />);
		await waitFor("render", 1000);

		const root = getComponentById("root");
		const region = await getRegionRelativeToScreenForComponent(activeWindow, root);

		const pos = await centerOf(region);
		const pixel = await screen.colorAt(pos);

		expect(pixel.toString()).toEqual("rgb(0,0,255)");
	});
});
