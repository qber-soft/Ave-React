import React from "react";
import { useEffect, useState } from "react";
import { Window as NativeWindow } from "ave-ui";
import { getAppContext, Grid, Window } from "../../../src/ave-react";

export interface ITestLayoutProps {
	children?: any[] | any;
	width?: string;
	height?: string;
}

export function TestLayout(props: ITestLayoutProps) {
	const width = props?.width ?? "120dpx";
	const height = props?.height ?? "32dpx";

	const demoLayout = {
		columns: `1 ${width} 1`,
		rows: `1 ${height} 1`,
		areas: {
			center: { row: 1, column: 1 },
		},
	};
	return (
		<Grid style={{ layout: demoLayout }}>
			<Grid style={{ area: demoLayout.areas.center }}>{props.children}</Grid>
		</Grid>
	);
}

export interface ITestWindowProps {
	title?: string;
}

export interface ITestContext {
	defaultWindowTitle: string;

	render: (content: any) => void;
	updateTitle: (title: string) => void;

	begin(): void;
	end(): void;
}

class __TestContext implements ITestContext {
	defaultWindowTitle = "Ave React E2E";
	render = null;
	updateTitle = null;

	constructor() {}

	begin(): NativeWindow {
		const context = getAppContext();
		const window = context.getWindow();
		window.SetTopMost(true);
		window.Activate();
		return window;
	}

	end() {
		const context = getAppContext();
		const window = context.getWindow();
		window.CloseWindow();
	}
}

export const TestContext = new __TestContext();

export function TestWindow(props: ITestWindowProps) {
	const [title, setTitle] = useState(TestContext.defaultWindowTitle);
	const [content, setContent] = useState(null);

	useEffect(() => {
		TestContext.render = setContent;
		TestContext.updateTitle = (title: string) => setTitle(`${TestContext.defaultWindowTitle}: ${title}`);
		console.log(`[test window] assign setContent`);
	}, []);

	return (
		<Window title={title}>
			<TestLayout>{content}</TestLayout>
		</Window>
	);
}
