import React, { useEffect, useState } from "react";
import { Grid } from "../../../src/ave-react";
import { getComponents } from "../../ave-testing";
import { Color, waitFor } from "../../common";
import { setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { assertColorAtCenter, imageSnapshotTest } from "../common/image";
import { getUpdateFunction } from "../common/update";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum GridTestCases {
	MountAndUnMount = "display grid and remove",
	// update props
	UpdateBackgroundColor = "update background color",
	UpdateLayout = "update layout",
	UpdateArea = "update area",
}

describe("grid", () => {
	test(GridTestCases.MountAndUnMount, async () => {
		TestContext.updateTitle(GridTestCases.MountAndUnMount);

		function TestCase() {
			return <Grid id="root" style={{ backgroundColor: Color.Green }}></Grid>;
		}

		{
			await assertColorAtCenter(TestContext.containerId, "rgb(255,255,255)");
			const components = getComponents();
			expect(components.length).toEqual(TestContext.defaultComponentCount);
		}

		{
			TestContext.render(<TestCase />);
			await waitFor("render", 1000);
			await assertColorAtCenter(TestContext.containerId, "rgb(0,255,0)");

			const components = getComponents();
			expect(components.length).toEqual(TestContext.defaultComponentCount + 1);
		}

		{
			TestContext.render(<></>);
			await waitFor("render", 1000);
			await assertColorAtCenter(TestContext.containerId, "rgb(255,255,255)");

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
				fireUpdate = getUpdateFunction(() => {
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
					<Grid style={{ backgroundColor: Color.Blue, area: containerLayout.areas.left }}></Grid>
					{shouldAppend ? <Grid style={{ backgroundColor: Color.Red, area: containerLayout.areas.right }}></Grid> : <></>}
				</Grid>
			);
		}

		TestContext.render(<TestCase />);
		await waitFor("render", 1000);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(GridTestCases.UpdateArea, async () => {
		TestContext.updateTitle(GridTestCases.UpdateArea);

		let fireUpdate = null;
		function TestCase() {
			const [shouldUpdate, setShouldUpdate] = useState(false);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update grid area`);
					setShouldUpdate(true);
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
					<Grid style={{ backgroundColor: Color.Blue, area: shouldUpdate ? containerLayout.areas.right : containerLayout.areas.left }}></Grid>
				</Grid>
			);
		}

		TestContext.render(<TestCase />);
		await waitFor("render", 1000);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(GridTestCases.UpdateBackgroundColor, async () => {
		TestContext.updateTitle(GridTestCases.UpdateBackgroundColor);

		let fireUpdate = null;
		function TestCase() {
			const [color, setColor] = useState(Color.Blue);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update background color`);
					setColor(Color.Red);
				});
			}, []);
			return <Grid id="root" style={{ backgroundColor: color }}></Grid>;
		}

		TestContext.render(<TestCase />);
		await waitFor("render", 1000);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});
});
