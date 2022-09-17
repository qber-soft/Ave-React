import React from "react";
import { Window, Pager, Image } from "../../ave-react";
import { assetsPath, DemoLayout } from "../common";

export function TestPagerBasic() {
	return (
		<Window title="Pager Basic">
			<DemoLayout width="1" height="1">
				<Pager>
					<Image src={assetsPath("wallpaper.png")} />
				</Pager>
			</DemoLayout>
		</Window>
	);
}
