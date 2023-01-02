import React from "react";
import { useEffect, useState } from "react";
import { App, Window as NativeWindow } from "ave-ui";
import { Window as NutjsWindow } from "@nut-tree/nut-js";
import { Button, getAppContext, Grid, IIconResource, Window } from "../../../src/ave-react";
import { Color, waitFor } from "../../common";
import { iconResource } from "./icon-resource";

export interface ITestLayoutProps {
	children?: any[] | any;
	width?: string;
	height?: string;
}

export interface ITestWindowProps {
	title?: string;
}

export interface ITestContext {
	defaultWindowTitle: string;
	defaultComponentCount: number;
	containerId: string;
	result: boolean;

	nativeWindow: NativeWindow;
	activeWindow: NutjsWindow;

	render: (content: any, wait?: number) => Promise<void>;
	updateTitle: (title: string) => void;

	begin(): void;
	end(): void;
}

class __TestContext implements ITestContext {
	defaultWindowTitle = "Ave React Manual";
	defaultComponentCount = 3; // window > grid > grid
	render: ITestContext["render"];
	updateTitle: ITestContext["updateTitle"] = null;
	nativeWindow: NativeWindow = null;
	activeWindow: NutjsWindow = null;
	containerId = "__container__";
	result = null;

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

	const mainLayout = {
		columns: `1 120dpx`,
		rows: `1`,
		areas: {
			demo: { row: 0, column: 0 },
			control: { row: 0, column: 1 },
		},
	};

	const controlLayout = {
		columns: `1`,
		rows: `32dpx 16dpx 32dpx 1`,
		areas: {
			pass: { row: 0, column: 0 },
			fail: { row: 2, column: 0 },
		},
	};

	return (
		<Grid style={{ layout: mainLayout, backgroundColor: Color.White }}>
			<Grid style={{ layout: demoLayout, backgroundColor: Color.White, area: mainLayout.areas.demo }} id={TestContext.containerId}>
				<Grid style={{ area: demoLayout.areas.center, backgroundColor: Color.White }}>{props.children}</Grid>
			</Grid>
			<Grid style={{ layout: controlLayout, backgroundColor: Color.White, area: mainLayout.areas.control }}>
				<Button text="Pass" style={{ area: controlLayout.areas.pass, margin: "4dpx 4dpx 4dpx 0" }} onClick={() => (TestContext.result = true)}></Button>
				<Button text="Fail" style={{ area: controlLayout.areas.fail, margin: "4dpx 0 4dpx 0" }} onClick={() => (TestContext.result = false)}></Button>
			</Grid>
		</Grid>
	);
}

function onInit(app: App) {
	const context = getAppContext();
	context.setIconResource(iconResource as unknown as IIconResource);
}

export function ManualTestWindow(props: ITestWindowProps) {
	const [title, setTitle] = useState(TestContext.defaultWindowTitle);
	const [content, setContent] = useState(null);

	useEffect(() => {
		TestContext.render = async (content: any, wait = 1000) => {
			setContent(content);
			const context = getAppContext();
			const window = context.getWindow();
			window.Redraw();
			await waitFor("render and redraw", wait);
		};
		TestContext.updateTitle = (title: string) => setTitle(`${TestContext.defaultWindowTitle}: ${title}`);
	}, []);

	return (
		<Window title={title} onInit={onInit}>
			<TestLayout>{content}</TestLayout>
		</Window>
	);
}
