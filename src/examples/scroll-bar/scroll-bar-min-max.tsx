import React from "react";
import { Window, ScrollBar } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestScrollBarMinMax() {
	return (
		<Window title="ScrollBar Min Max">
			<DemoLayout width="240dpx" height="16dpx">
				<ScrollBar min={40} max={60} value={50}></ScrollBar>
			</DemoLayout>
		</Window>
	);
}
