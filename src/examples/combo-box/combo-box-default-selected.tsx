import React from "react";
import { Window, ComboBox, IComboBoxComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestComboBoxDefaultSelected() {
	const options: IComboBoxComponentProps["options"] = [
		{ key: "1", text: "a" },
		{ key: "2", text: "b" },
		{ key: "3", text: "c" },
	];
	return (
		<Window title="ComboBox Basic">
			<DemoLayout>
				<ComboBox options={options} defaultSelectedKey="2"></ComboBox>
			</DemoLayout>
		</Window>
	);
}
