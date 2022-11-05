import React from "react";
import { Window, RichListBox, IRichListBoxComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestRichListBoxBasic() {
	const headers: IRichListBoxComponentProps["headers"] = [
		{ name: "ID", size: "200dpx", dataKey: "id" },
		{ name: "Name", size: "200dpx", dataKey: "name" },
	];

	const data: IRichListBoxComponentProps["data"] = [
		{ id: "1", name: "a" },
		{ id: "2", name: "b" },
		{ id: "3", name: "c" },
		{ id: "4", name: "d" },
		{ id: "5", name: "e" },
		{ id: "6", name: "f" },
	];

	return (
		<Window title="RichListBox Basic">
			<DemoLayout width="410dpx" height="300dpx">
				<RichListBox
					headers={headers}
					data={data}
					onSelectionEnd={(sender) => {
						const itemIndex = sender.ItemGetSelection();
						console.log(itemIndex);
					}}
				></RichListBox>
			</DemoLayout>
		</Window>
	);
}
