import React, { useEffect, useState } from "react";
import { Window, ComboBox, IComboBoxComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

const defaultOptions: IComboBoxComponentProps["options"] = [
	{ key: "1", text: "a" },
	{ key: "2", text: "b" },
	{ key: "3", text: "c" },
];

export function TestComboBoxComplex2() {
	const [options, setOptions] = useState(defaultOptions);

	useEffect(() => {
		setTimeout(() => {
			setOptions([{ key: "6", text: "g" }]);
		}, 2000);
	}, []);
	return (
		<Window title="ComboBox Complex 2">
			<DemoLayout>
				<ComboBox options={options}></ComboBox>
			</DemoLayout>
		</Window>
	);
}
