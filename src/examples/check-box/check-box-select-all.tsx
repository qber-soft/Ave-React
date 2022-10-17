import { CheckBox as NativeCheckBox, CheckValue } from "ave-ui";
import React, { useEffect, useRef, useState } from "react";
import { Window, CheckBox, Grid, ICheckBoxComponentProps } from "../../ave-react";

/**
 * test cases
 *
 * 1. click use all, expect react, vue, svelte checked
 * 	- click use all again, expect react, vue, svelte not checked
 * 2. click use all, click react, expect use all mixed
 * 3. click react, expect use all mixed
 * 	- click vue, expect use all mixed
 * 	- click svelte, expect use all checked
 *  - click svelte again, expect use all mixed
 *  - click use all, expect react, vue, svelte checked
 *  - click react, vue, svelte, expect use all not checked
 */
export function TestCheckBoxSelectAll() {
	const options = ["React", "Vue", "Svelte"];
	const checkedSet = useRef(new Set());
	const refCheckAll = useRef<NativeCheckBox>();
	const [checkedList, setCheckedList] = useState([]);
	const [value, setValue] = useState(CheckValue.Unchecked);

	const onCheck: ICheckBoxComponentProps["onCheck"] = (sender) => {
		const text = sender.GetText();
		const checkValue = sender.GetValue();
		if (checkValue === CheckValue.Checked) {
			checkedSet.current.add(text);
		} else if (checkValue === CheckValue.Unchecked) {
			checkedSet.current.delete(text);
		}

		const checkedSize = checkedSet.current.size;
		if (checkedSize === options.length) {
			setValue(CheckValue.Checked);
		} else if (checkedSize === 0) {
			setValue(CheckValue.Unchecked);
		} else {
			setValue(CheckValue.Mixed);
		}

		setCheckedList([...checkedSet.current]);
	};

	const onCheckAll = () => {
		options.forEach((each) => {
			if (value === CheckValue.Checked) {
				checkedSet.current.add(each);
			} else if (value === CheckValue.Unchecked) {
				checkedSet.current.delete(each);
			}
		});

		setCheckedList([...checkedSet.current]);
	};

	const onCheckingAll: ICheckBoxComponentProps["onChecking"] = (sender) => {
		refCheckAll.current = sender;
		const next = sender.GetNextValue();

		if (value === CheckValue.Unchecked && next === CheckValue.Checked) {
			setValue(CheckValue.Checked);
		} else if (value === CheckValue.Checked && next === CheckValue.Mixed) {
			setValue(CheckValue.Unchecked);
		} else if (value === CheckValue.Mixed && next === CheckValue.Unchecked) {
			setValue(CheckValue.Checked);
		}

		return false;
	};

	useEffect(() => {
		onCheckAll();
	}, [value]);

	return (
		<Window title="CheckBox SelectAll">
			<DemoLayout>
				<CheckBox text="Use all" triple value={value} onChecking={onCheckingAll}></CheckBox>
				{...options.map((each) => {
					const value = checkedList.includes(each) ? CheckValue.Checked : CheckValue.Unchecked;
					return <CheckBox key={each} text={each} onCheck={onCheck} value={value}></CheckBox>;
				})}
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
		columns: `1 ${width} ${width} ${width} 1`,
		rows: `1 ${height} ${height} 1`,
		areas: {
			useAll: { row: 1, column: 1 },
			react: { row: 2, column: 1 },
			vue: { row: 2, column: 2 },
			svelte: { row: 2, column: 3 },
		},
	};
	const [useAll, react, vue, svelte] = props.children;

	return (
		<Grid style={{ layout: demoLayout }}>
			<Grid style={{ area: demoLayout.areas.useAll }}>{useAll}</Grid>
			<Grid style={{ area: demoLayout.areas.react }}>{react}</Grid>
			<Grid style={{ area: demoLayout.areas.vue }}>{vue}</Grid>
			<Grid style={{ area: demoLayout.areas.svelte }}>{svelte}</Grid>
		</Grid>
	);
}
