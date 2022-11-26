import { Vec4 } from "ave-ui";
import React from "react";
import { Grid } from "../../../src/ave-react";
import { getComponentById, getComponents } from "../../ave-testing";
import { waitFor } from "../../common";
import { getRegionRelativeToScreenForComponent, setupJest, TestContext } from "../common";
import { centerOf, screen } from "@nut-tree/nut-js";

setupJest();

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
		const region = await getRegionRelativeToScreenForComponent(TestContext.activeWindow, root);

		const pos = await centerOf(region);
		const pixel = await screen.colorAt(pos);

		expect(pixel.toString()).toEqual("rgb(0,0,255)");
	});
});
