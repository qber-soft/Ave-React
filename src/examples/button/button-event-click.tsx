import React, { useState } from "react";
import { Window, Button } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestButtonEventClick() {
	const [text, setText] = useState("Button");

	return (
		<Window title="Button Event Click">
			<DemoLayout>
				<Button text={text} onClick={() => setText("Button Clicked")}></Button>
			</DemoLayout>
		</Window>
	);
}
