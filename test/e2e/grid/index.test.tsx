import { Vec4 } from "ave-ui";
import React from "react";
import { AveRenderer, Grid } from "../../../src/ave-react";
import { getComponentById } from "../../ave-testing";
import { waitFor } from "../../common";
import { findWindowByTitle, getRegionRelativeToScreenForComponent, TestContext, TestWindow } from "../common";
import { centerOf, screen } from "@nut-tree/nut-js";

jest.setTimeout(60 * 1000);

beforeAll(async () => {
	AveRenderer.render(<TestWindow />);
	await waitFor("window ready", 1000);
});

afterAll(() => {
	TestContext.end();
});

enum GridTestCases {
	BackgroundColor = "display grid with background color",
}

describe("grid", () => {
	test(GridTestCases.BackgroundColor, async () => {
		function TestCase() {
			return <Grid id="root" style={{ backgroundColor: new Vec4(0, 0, 255, 255) }}></Grid>;
		}

		const nativeWindow = TestContext.begin();
		await waitFor("window active", 1000);
		TestContext.updateTitle(GridTestCases.BackgroundColor);

		TestContext.render(<TestCase />);
		await waitFor("render", 1000);
		nativeWindow.Redraw();

		const root = getComponentById("root");
		const activeWindow = await findWindowByTitle(GridTestCases.BackgroundColor);

		const region = await getRegionRelativeToScreenForComponent(activeWindow, root);
		const pos = await centerOf(region);
		const pixel = await screen.colorAt(pos);

		expect(pixel.toString()).toEqual("rgb(0,0,255)");
	});
});
