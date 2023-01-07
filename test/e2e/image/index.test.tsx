import React from "react";
import { Image, Grid } from "../../../src/ave-react";
import { imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";
import { Color } from "../../common";
import { assetsPath } from "../common/icon-resource";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum ImageTestCases {
	MountAndUnMount = "display image and remove",
	// update props
}

describe("image", () => {
	test(ImageTestCases.MountAndUnMount, async () => {
		TestContext.updateTitle(ImageTestCases.MountAndUnMount);
		TestContext.updateLayout("128dpx", "128dpx");

		function TestCase() {
			const src = assetsPath("color-wheel.png");
			return (
				<Grid id="root" style={{ backgroundColor: Color.Grey }}>
					<Image src={src} />
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
});
