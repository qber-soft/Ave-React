import React, { useEffect, useState } from "react";
import { Window, ComboBox, IComboBoxComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

const defaultOptions: IComboBoxComponentProps["options"] = [];

export function TestComboBoxAdd3() {
	const [options, setOptions] = useState(defaultOptions);

	useEffect(() => {
		setTimeout(() => {
			setOptions([
				{ key: "1", text: "a" },
				{ key: "2", text: "b" },
				{ key: "3", text: "c" },
			]);
		}, 2000);
	}, []);
	return (
		<Window title="ComboBox Add 3">
			<DemoLayout>
				<ComboBox options={options}></ComboBox>
			</DemoLayout>
		</Window>
	);
}
