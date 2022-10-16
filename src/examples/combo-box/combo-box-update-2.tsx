import React, { useEffect, useState } from "react";
import { Window, ComboBox, IComboBoxComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

const defaultOptions: IComboBoxComponentProps["options"] = [
	{ key: "1", text: "a" },
	{ key: "2", text: "b" },
	{ key: "3", text: "c" },
];

export function TestComboBoxUpdate2() {
	const [options, setOptions] = useState(defaultOptions);

	useEffect(() => {
		setTimeout(() => {
			setOptions([
				{ key: "1", text: "a" },
				{ key: "3", text: "c" },
				{ key: "2", text: "b" },
			]);
		}, 2000);
	}, []);
	return (
		<Window title="ComboBox Update 2">
			<DemoLayout>
				<ComboBox options={options}></ComboBox>
			</DemoLayout>
		</Window>
	);
}
