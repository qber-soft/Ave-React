import React from "react";
import { Window, Progress } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestProgressBasic() {
	return (
		<Window title="Progress Basic">
			<DemoLayout>
				<Progress value={50}></Progress>
			</DemoLayout>
		</Window>
	);
}
