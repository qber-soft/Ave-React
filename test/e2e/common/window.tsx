import React from "react";
import { useEffect, useState } from "react";
import { App, CultureId, Window as NativeWindow } from "ave-ui";
import { Window as NutjsWindow } from "@nut-tree/nut-js";
import { getAppContext, Grid, IIconResource, Window } from "../../../src/ave-react";
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

	nativeWindow: NativeWindow;
	activeWindow: NutjsWindow;

	width: string;
	height: string;

	render: (content: any, wait?: number) => Promise<void>;
	updateTitle: (title: string) => void;

	begin(): void;
	end(): void;
	restore(): void;
	updateLayout(width: string, height: string): void;
}

class __TestContext implements ITestContext {
	defaultWindowTitle = "Ave React E2E";
	defaultComponentCount = 3; // window > grid > grid
	render: ITestContext["render"];
	updateTitle: ITestContext["updateTitle"] = null;
	nativeWindow: NativeWindow = null;
	activeWindow: NutjsWindow = null;
	containerId = "__container__";
	width: string = "120dpx";
	height: string = "32dpx";

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

	restore() {
		this.updateLayout("120dpx", "32dpx");
	}

	updateLayout(width: string, height: string) {
		this.width = width;
		this.height = height;
	}
}

export const TestContext = new __TestContext();

export function TestLayout(props: ITestLayoutProps) {
	const width = props?.width ?? TestContext.width;
	const height = props?.height ?? TestContext.height;

	const demoLayout = {
		columns: `1 ${width} 1`,
		rows: `1 ${height} 1`,
		areas: {
			center: { row: 1, column: 1 },
		},
	};
	return (
		<Grid style={{ layout: demoLayout, backgroundColor: Color.White }} id={TestContext.containerId}>
			<Grid style={{ area: demoLayout.areas.center, backgroundColor: Color.White }}>{props.children}</Grid>
		</Grid>
	);
}

function onInit(app: App) {
	const context = getAppContext();
	context.setIconResource(iconResource as unknown as IIconResource);
	app.LangSetCurrent(CultureId.en_us);
}

export function TestWindow(props: ITestWindowProps) {
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
