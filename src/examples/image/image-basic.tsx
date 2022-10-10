import React from "react";
import { Window, Image } from "../../ave-react";
import { assetsPath, DemoLayout } from "../common";

export function TestImageBasic() {
	const src = assetsPath("Clock#6.png");
	return (
		<Window title="Image Basic">
			<DemoLayout width="1" height="1">
				<Image src={src} />
			</DemoLayout>
		</Window>
	);
}
