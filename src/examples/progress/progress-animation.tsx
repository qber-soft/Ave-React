import React from "react";
import { Window, Progress } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestProgressAnimation() {
	return (
		<Window title="Progress Animation">
			<DemoLayout>
				<Progress value={50} animation></Progress>
			</DemoLayout>
		</Window>
	);
}
