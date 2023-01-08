import React, { useEffect, useState } from "react";
import { Image, Grid, getAppContext } from "../../../src/ave-react";
import { getUpdateFunction, imageSnapshotTest, setupJest, TestContext } from "../common";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { getComponents } from "../../ave-testing";
import { Color } from "../../common";
import { assetsPath } from "../common/icon-resource";
import { AveImage, Byo2Image, ResourceSource, Picture as NativePicture, ImageData } from "ave-ui";
import fs from "fs";

expect.extend({ toMatchImageSnapshot });
setupJest();

enum ImageTestCases {
	MountAndUnMount = "display image and remove",
	OnLoad = "onLoad",
	// update props
	UpdateSrc = "update src",
	UpdateSrcAveImage = "update src ave image",
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

	test(ImageTestCases.UpdateSrc, async () => {
		TestContext.updateTitle(ImageTestCases.UpdateSrc);
		TestContext.updateLayout("128dpx", "128dpx");

		let fireUpdate = null;
		function TestCase() {
			const [src, setSrc] = useState(assetsPath("color-wheel.png"));

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update src`);
					setSrc(assetsPath("Clock#6.png"));
				});
			}, []);
			return (
				<Grid id="root" style={{ backgroundColor: Color.Grey }}>
					<Image src={src} />
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(ImageTestCases.UpdateSrcAveImage, async () => {
		TestContext.updateTitle(ImageTestCases.UpdateSrcAveImage);
		TestContext.updateLayout("128dpx", "128dpx");

		let fireUpdate = null;
		function TestCase() {
			const [src, setSrc] = useState<string | AveImage>(assetsPath("color-wheel.png"));

			useEffect(() => {
				fireUpdate = getUpdateFunction(() => {
					console.log(`update src ave image`);
					const context = getAppContext();
					const codec = context.imageCodec;
					const clockSrc = assetsPath("Clock#6.png");
					const buffer = fs.readFileSync(clockSrc);
					const resourceSource = ResourceSource.FromBuffer(buffer);
					const aveImage = codec.Open(resourceSource);
					setSrc(aveImage);
				});
			}, []);
			return (
				<Grid id="root" style={{ backgroundColor: Color.Grey }}>
					<Image src={src} />
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await imageSnapshotTest("root");

		await fireUpdate();
		await imageSnapshotTest("root");
	});

	test(ImageTestCases.OnLoad, async () => {
		TestContext.updateTitle(ImageTestCases.OnLoad);
		TestContext.updateLayout("128dpx", "128dpx");

		const onLoad = jest.fn((byo2: Byo2Image, data: ImageData, picture: NativePicture) => {
			expect(byo2.GetWidth()).toEqual(128);
			expect(byo2.GetHeight()).toEqual(128);

			expect(data.Width).toEqual(128);
			expect(data.Height).toEqual(128);

			const size = picture.GetSize();
			expect(size.x).toEqual(128);
			expect(size.y).toEqual(128);
		});

		function TestCase() {
			const src = assetsPath("color-wheel.png");
			return (
				<Grid id="root" style={{ backgroundColor: Color.Grey }}>
					<Image src={src} onLoad={onLoad} />
				</Grid>
			);
		}

		//
		await TestContext.render(<TestCase />);

		expect(onLoad).toHaveBeenCalledTimes(1);
	});
});
