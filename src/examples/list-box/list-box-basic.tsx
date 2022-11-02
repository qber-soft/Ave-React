import React from "react";
import { Window, ListBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestListBoxBasic() {
	return (
		<Window title="ListBox Basic">
			<DemoLayout width="200dpx" height="300dpx">
				<ListBox items={["a", "b", "c"]}></ListBox>
			</DemoLayout>
		</Window>
	);
}
