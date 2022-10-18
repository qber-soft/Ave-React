import { CheckValue } from "ave-ui";
import React, { useEffect, useState } from "react";
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
	const [checkedSet, setCheckedSet] = useState(new Set<string>());
	const [valueCheckAll, setValueCheckAll] = useState(CheckValue.Unchecked);

	const onCheck: ICheckBoxComponentProps["onCheck"] = (sender) => {
		const text = sender.GetText();
		const checkValue = sender.GetValue();
		const clone = new Set(checkedSet);

		if (checkValue === CheckValue.Checked) {
			clone.add(text);
		} else if (checkValue === CheckValue.Unchecked) {
			clone.delete(text);
		}

		setCheckedSet(clone);
	};

	const onCheckingAll: ICheckBoxComponentProps["onChecking"] = (sender) => {
		const next = sender.GetNextValue();
		if (valueCheckAll === CheckValue.Unchecked && next === CheckValue.Checked) {
			setCheckedSet(new Set(options));
		} else if (valueCheckAll === CheckValue.Checked && next === CheckValue.Mixed) {
			setCheckedSet(new Set());
		} else if (valueCheckAll === CheckValue.Mixed && next === CheckValue.Unchecked) {
			setCheckedSet(new Set(options));
		}

		return false;
	};

	useEffect(() => {
		if (checkedSet.size === options.length) {
			setValueCheckAll(CheckValue.Checked);
		} else if (checkedSet.size === 0) {
			setValueCheckAll(CheckValue.Unchecked);
		} else {
			setValueCheckAll(CheckValue.Mixed);
		}
	}, [checkedSet]);

	return (
		<Window title="CheckBox SelectAll">
			<DemoLayout>
				<CheckBox text="Use all" triple value={valueCheckAll} onChecking={onCheckingAll}></CheckBox>
				{...options.map((each) => <CheckBox key={each} text={each} onCheck={onCheck} value={checkedSet.has(each) ? CheckValue.Checked : CheckValue.Unchecked}></CheckBox>)}
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
