import React, { useState } from "react";
import { Window, RadioBox, IRadioBoxComponentProps, Grid } from "../../ave-react";

export function TestRadioBoxOnCheck() {
	const [valueA, setValueA] = useState(false);
	const [valueB, setValueB] = useState(false);

	const onCheck: IRadioBoxComponentProps["onCheck"] = (sender) => {
		const option = sender.GetText();
		console.log(`${option} onCheck`);

		if (option === "Option A" && !valueA) {
			setValueA(!valueA);
			setValueB(false);
		} else if (option === "Option B" && !valueB) {
			setValueB(!valueB);
			setValueA(false);
		}
	};

	return (
		<Window title="RadioBox onCheck">
			<DemoLayout>
				<RadioBox text="Option A" onCheck={onCheck} value={valueA}></RadioBox>
				<RadioBox text="Option B" onCheck={onCheck} value={valueB}></RadioBox>
			</DemoLayout>
		</Window>
	);
}

interface IDemoLayoutProps {
	children?: any[] | any;
	width?: string;
	height?: string;
}

function DemoLayout(props: IDemoLayoutProps) {
	const width = props?.width ?? "120dpx";
	const height = props?.height ?? "32dpx";

	const demoLayout = {
		columns: `1 ${width} ${width} 1`,
		rows: `1 ${height} 1`,
		areas: {
			left: { row: 1, column: 1 },
			right: { row: 1, column: 2 },
		},
	};
	const [left, right] = props.children;
	return (
		<Grid style={{ layout: demoLayout }}>
			<Grid style={{ area: demoLayout.areas.left }}>{left}</Grid>
			<Grid style={{ area: demoLayout.areas.right }}>{right}</Grid>
		</Grid>
	);
}
