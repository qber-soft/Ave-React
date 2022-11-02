import React, { useEffect, useState } from "react";
import { Window, ListBox } from "../../ave-react";
import { DemoLayout } from "../common";

const defaultItems = ["a", "b", "c"];

export function TestListBoxUpdate() {
	const [items, setItems] = useState(defaultItems);
	useEffect(() => {
		setTimeout(() => {
			setItems(["a", "b-update", "c"]);
		}, 2000);
	}, []);
	return (
		<Window title="ListBox Update">
			<DemoLayout width="200dpx" height="300dpx">
				<ListBox items={items}></ListBox>
			</DemoLayout>
		</Window>
	);
}
