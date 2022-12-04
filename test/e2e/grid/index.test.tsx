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
	UpdateLayout = "update layout", // append
	UpdateLayout2 = "update layout 2", // insert
	UpdateLayout3 = "update layout 3", // remove
	UpdateLayout4 = "update grid size",
	UpdateLayout5 = "update grid columns and rows",
	UpdateArea = "update area",
	UpdateBackgroundColor = "update background color",
	UpdateOpacity = "update opacity",
	UpdateMargin = "update margin",
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

	test(GridTestCases.UpdateLayout4, async () => {
		TestContext.updateTitle(GridTestCases.UpdateLayout4);

		let fireUpdate = null;
		const defaultLayout = {
			columns: `1 120dpx 1`,
			rows: `1 32dpx 1`,
			areas: {
				center: { row: 1, column: 1 },
			},
		};

		function TestCase() {
			const [layout, setLayout] = useState(defaultLayout);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update grid size`);
					setLayout({
						columns: `1 16dpx 1`,
						rows: `1 16dpx 1`,
						areas: {
							center: { row: 1, column: 1 },
						},
					});
				});
			}, []);

			return (
				<Grid id="root" style={{ backgroundColor: Color.Red, layout: layout }}>
					<Grid style={{ backgroundColor: Color.Blue, area: layout.areas.center }}></Grid>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(GridTestCases.UpdateLayout5, async () => {
		TestContext.updateTitle(GridTestCases.UpdateLayout5);

		let fireUpdate = null;
		const defaultLayout = {
			columns: `1 120dpx 1`,
			rows: `1 32dpx 1`,
			areas: {
				center: { row: 1, column: 1 },
			},
		};

		function TestCase() {
			const [layout, setLayout] = useState(defaultLayout);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update grid columns and rows`);
					setLayout({
						columns: `1 16dpx`,
						rows: `16dpx 1`,
						areas: {
							center: { row: 0, column: 1 },
						},
					});
				});
			}, []);

			return (
				<Grid id="root" style={{ backgroundColor: Color.Red, layout: layout }}>
					<Grid style={{ backgroundColor: Color.Blue, area: layout.areas.center }}></Grid>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
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

	test(GridTestCases.UpdateOpacity, async () => {
		TestContext.updateTitle(GridTestCases.UpdateOpacity);

		let fireUpdate = null;
		function TestCase() {
			const [opacity, setOpacity] = useState(0.5);

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update opacity`);
					setOpacity(1);
				});
			}, []);
			return <Grid id="root" style={{ opacity, backgroundColor: Color.Blue }}></Grid>;
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(GridTestCases.UpdateMargin, async () => {
		TestContext.updateTitle(GridTestCases.UpdateMargin);

		let fireUpdate = null;
		function TestCase() {
			const [margin, setMargin] = useState("8dpx 8dpx 0dpx 0dpx");

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update margin`);
					setMargin("4dpx 4dpx 8dpx 8dpx");
				});
			}, []);
			return (
				<Grid id="root" style={{ backgroundColor: Color.Blue }}>
					<Grid style={{ margin, backgroundColor: Color.Red }}></Grid>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});
});
