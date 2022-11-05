import React from "react";
import { Window, RichListBox, IRichListBoxComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestRichListBoxBasic() {
	const headers: IRichListBoxComponentProps["headers"] = [
		{ name: "ID", size: "200dpx" },
		{ name: "Name", size: "200dpx" },
	];
	return (
		<Window title="RichListBox Basic">
			<DemoLayout width="410dpx" height="300dpx">
				<RichListBox headers={headers}></RichListBox>
			</DemoLayout>
		</Window>
	);
}
