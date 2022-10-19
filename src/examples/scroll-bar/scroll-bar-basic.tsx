import React from "react";
import { Window, ScrollBar } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestScrollBarBasic() {
	return (
		<Window title="ScrollBar Basic">
			<DemoLayout width="240dpx" height="16dpx">
				<ScrollBar value={50}></ScrollBar>
			</DemoLayout>
		</Window>
	);
}
