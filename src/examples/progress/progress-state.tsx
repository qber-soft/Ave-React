import { ProgressBarState } from "ave-ui";
import React from "react";
import { Window, Progress } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestProgressState() {
	return (
		<Window title="Progress State">
			<DemoLayout>
				<Progress value={50} state={ProgressBarState.Error}></Progress>
			</DemoLayout>
		</Window>
	);
}
