import React from "react";
import { Window, Progress } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestProgressMax() {
	return (
		<Window title="Progress Max">
			<DemoLayout>
				<Progress value={50} max={75}></Progress>
			</DemoLayout>
		</Window>
	);
}
