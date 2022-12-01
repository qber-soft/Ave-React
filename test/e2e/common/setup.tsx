import React from "react";
import { AveRenderer } from "../../../src/ave-react";
import { getComponents } from "../../ave-testing";
import { waitFor } from "../../common";
import { findWindowByTitle, focusWindow } from "./nutjs";
import { TestContext, TestWindow } from "./window";

export async function setupTestWindow() {
	AveRenderer.render(<TestWindow />);
	await waitFor("window ready", 1000);

	TestContext.nativeWindow = TestContext.begin();
	await waitFor("window active", 1000);

	TestContext.activeWindow = await findWindowByTitle(TestContext.defaultWindowTitle);
	await focusWindow(TestContext.activeWindow);
}

export function setupJest() {
	jest.setTimeout(60 * 1000);

	beforeAll(async () => {
		await setupTestWindow();
	});

	afterEach(async () => {
		// await waitFor("[debug only] review test result", 3000);
		await TestContext.render(<></>);
		const components = getComponents();
		expect(components.length).toEqual(TestContext.defaultComponentCount);
	});

	afterAll(() => {
		TestContext.end();
	});
}
