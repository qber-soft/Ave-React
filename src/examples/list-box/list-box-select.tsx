import React from "react";
import { Window, ListBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestListBoxSelect() {
	return (
		<Window title="ListBox Select">
			<DemoLayout width="200dpx" height="300dpx">
				<ListBox
					items={["a", "b", "c"]}
					onSelectionEnd={(sender) => {
						console.log(sender.GetSelection());
					}}
				></ListBox>
			</DemoLayout>
		</Window>
	);
}
