import React, { useEffect, useState } from "react";
import { Window, ComboBox, IComboBoxComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

const defaultOptions: IComboBoxComponentProps["options"] = [
	{ key: "1", text: "a" },
	{ key: "2", text: "b" },
	{ key: "3", text: "c" },
];

export function TestComboBoxAdd() {
	const [options, setOptions] = useState(defaultOptions);

	useEffect(() => {
		setTimeout(() => {
			setOptions([
				{ key: "1", text: "a" },
				{ key: "2", text: "b" },
				{ key: "4", text: "d" },
				{ key: "3", text: "c" },
			]);
		}, 2000);
	}, []);
	return (
		<Window title="ComboBox Add">
			<DemoLayout>
				<ComboBox options={options}></ComboBox>
			</DemoLayout>
		</Window>
	);
}
