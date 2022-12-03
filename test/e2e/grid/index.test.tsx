import React, { useEffect, useState } from "react";
import { Grid } from "../../../src/ave-react";
import { getComponentById, getComponents } from "../../ave-testing";
import { Color } from "../../common";
import { setupJest, TestContext, getUpdateFunction, assertColorAtCenter, imageSnapshotTest } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum GridTestCases {
	MountAndUnMount = "display grid and remove",
	// update props
	UpdateBackgroundColor = "update background color",
	UpdateLayout = "update layout", // append
	UpdateLayout2 = "update layout 2", // insert
	UpdateLayout3 = "update layout 3", // remove
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
			await TestContext.render(<TestCase />);
			await assertColorAtCenter(TestContext.containerId, "rgb(0,255,0)");

			const components = getComponents();
			expect(components.length).toEqual(TestContext.defaultComponentCount + 1);
		}

		{
			await TestContext.render(<></>);
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
					<Grid id="child 1" style={{ backgroundColor: Color.Blue, area: containerLayout.areas.left }}></Grid>
					{shouldAppend ? <Grid id="child 2" style={{ backgroundColor: Color.Red, area: containerLayout.areas.right }}></Grid> : <></>}
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		const root = getComponentById("root");
		expect(root.children.map((each) => each.props?.id)).toEqual(["child 1"]);
		await imageSnapshotTest("root");

		await fireUpdate();
		expect(root.children.map((each) => each.props?.id)).toEqual(["child 1", "child 2"]);
		await imageSnapshotTest("root");
	});

	test(GridTestCases.UpdateLayout2, async () => {
		TestContext.updateTitle(GridTestCases.UpdateLayout2);

		let fireUpdate = null;
		function TestCase() {
			const [shouldInsert, setShouldInsert] = useState(false);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`insert grid`);
					setShouldInsert(true);
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
					{shouldInsert ? <Grid id="child 1" style={{ backgroundColor: Color.DanShuHong, area: containerLayout.areas.right }}></Grid> : <></>}
					<Grid id="child 2" style={{ backgroundColor: Color.DarkBlue, area: containerLayout.areas.left }}></Grid>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		const root = getComponentById("root");
		expect(root.children.map((each) => each.props?.id)).toEqual(["child 2"]);
		await imageSnapshotTest("root");

		await fireUpdate();
		expect(root.children.map((each) => each.props?.id)).toEqual(["child 1", "child 2"]);
		await imageSnapshotTest("root");
	});

	test(GridTestCases.UpdateLayout3, async () => {
		TestContext.updateTitle(GridTestCases.UpdateLayout3);

		let fireUpdate = null;
		function TestCase() {
			const [shouldRemove, setShouldRemove] = useState(false);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`remove grid`);
					setShouldRemove(true);
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
					{shouldRemove ? <></> : <Grid id="child 1" style={{ backgroundColor: Color.DanShuHong, area: containerLayout.areas.right }}></Grid>}
					<Grid id="child 2" style={{ backgroundColor: Color.DarkBlue, area: containerLayout.areas.left }}></Grid>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		const root = getComponentById("root");
		expect(root.children.map((each) => each.props?.id)).toEqual(["child 1", "child 2"]);
		await imageSnapshotTest("root");

		await fireUpdate();
		expect(root.children.map((each) => each.props?.id)).toEqual(["child 2"]);
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

		await TestContext.render(<TestCase />);
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

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});
});
