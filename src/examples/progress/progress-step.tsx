import React, { useEffect, useState } from "react";
import { Window, Progress } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestProgressStep() {
	const [value, setValue] = useState(0);
	useEffect(() => {
		setInterval(() => {
			if (value < 100) {
				setValue((prev) => prev + 1);
			}
		}, 100);
	}, []);
	return (
		<Window title="Progress Step">
			<DemoLayout>
				<Progress value={value}></Progress>
			</DemoLayout>
		</Window>
	);
}
