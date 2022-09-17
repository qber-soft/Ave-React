import { AveImage, ResourceSource } from "ave-ui";
import React, { useEffect, useState } from "react";
import { Window, Image, getAppContext } from "../../ave-react";
import { assetsPath, DemoLayout } from "../common";
import fs from "fs";

export function TestImageSrcAveImage() {
	const [src, setSrc] = useState<string | AveImage>("");

	useEffect(() => {
		const context = getAppContext();
		const codec = context.imageCodec;

		const filePath = assetsPath("color-wheel.png");
		const buffer = fs.readFileSync(filePath);
		const resourceSource = ResourceSource.FromBuffer(buffer);
		const aveImage = codec.Open(resourceSource);
		setSrc(aveImage);
	}, []);

	return (
		<Window title="Image Src AveImage">
			<DemoLayout width="1" height="1">
				<Image src={src} />
			</DemoLayout>
		</Window>
	);
}
