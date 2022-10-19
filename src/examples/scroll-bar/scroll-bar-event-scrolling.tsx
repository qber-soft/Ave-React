import React from "react";
import { Window, ScrollBar } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestScrollBarOnScrolling() {
	return (
		<Window title="ScrollBar OnScrolling">
			<DemoLayout width="240dpx" height="16dpx">
				<ScrollBar
					value={50}
					onScrolling={(sender) => {
						console.log(sender.GetValue());
					}}
				></ScrollBar>
			</DemoLayout>
		</Window>
	);
}
