import React from "react";
import { useEffect, useState } from "react";
import { Window as NativeWindow } from "ave-ui";
import { Window as NutjsWindow } from "@nut-tree/nut-js";
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
	defaultComponentCount: number;

	nativeWindow: NativeWindow;
	activeWindow: NutjsWindow;

	render: (content: any) => void;
	updateTitle: (title: string) => void;

	begin(): void;
	end(): void;
}

class __TestContext implements ITestContext {
	defaultWindowTitle = "Ave React E2E";
	defaultComponentCount = 3; // window > grid > grid
	render: ITestContext["render"];
	updateTitle: ITestContext["updateTitle"] = null;
	nativeWindow: NativeWindow = null;
	activeWindow: NutjsWindow = null;

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
		TestContext.render = (arg: any) => {
			setContent(arg);
			const context = getAppContext();
			const window = context.getWindow();
			window.Redraw();
		};
		TestContext.updateTitle = (title: string) => setTitle(`${TestContext.defaultWindowTitle}: ${title}`);
		console.log(`[test window] assign setContent`);
	}, []);

	return (
		<Window title={title}>
			<TestLayout>{content}</TestLayout>
		</Window>
	);
}
