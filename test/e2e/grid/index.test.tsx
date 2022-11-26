import { Vec4 } from "ave-ui";
import React, { useEffect, useState } from "react";
import { Grid } from "../../../src/ave-react";
import { getComponentById, getComponents } from "../../ave-testing";
import { Color, waitFor, saveRegionImage } from "../../common";
import { getRegionRelativeToScreenForComponent, setupJest, TestContext } from "../common";
import { centerOf, screen } from "@nut-tree/nut-js";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum GridTestCases {
	MountAndUnMount = "display grid and remove",
	UpdateLayout = "update layout prop",
	BackgroundColor = "display grid with background color",
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

	test(GridTestCases.UpdateLayout, async () => {
		TestContext.updateTitle(GridTestCases.UpdateLayout);

		let fireUpdate = null;
		function TestCase() {
			const [shouldAppend, setShouldAppend] = useState(false);

			useEffect(() => {
				fireUpdate = jest.fn(() => {
					console.log(`append grid`);
					setShouldAppend(true);
				});
			}, []);

			const containerLayout = {
				columns: "1 1",
				rows: "1",
				areas: {
					left: { row: 0, column: 0 },
					right: { row: 0, column: 1 },
				},
			};

			return (
				<Grid id="root" style={{ backgroundColor: Color.White, layout: containerLayout }}>
					<Grid style={{ backgroundColor: Color.DarkBlue, area: containerLayout.areas.left }}></Grid>
					{shouldAppend ? <Grid style={{ backgroundColor: Color.DanShuHong, area: containerLayout.areas.right }}></Grid> : <></>}
				</Grid>
			);
		}

		TestContext.render(<TestCase />);
		await waitFor("render", 1000);

		fireUpdate();
		await waitFor("update layout", 1000);
		TestContext.nativeWindow.Redraw();
		await waitFor("redraw", 500);

		const root = getComponentById("root");
		const region = await getRegionRelativeToScreenForComponent(TestContext.activeWindow, root);
		const image = await saveRegionImage(region);

		expect(image).toMatchImageSnapshot();
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
