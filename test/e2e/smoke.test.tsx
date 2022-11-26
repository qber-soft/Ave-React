import React from "react";
import { AveRenderer } from "../../src/ave-react";
import { waitFor } from "../common";
import { TestContext, TestWindow } from "./common";

jest.setTimeout(60 * 1000);

beforeAll(async () => {
	AveRenderer.render(<TestWindow />);
	await waitFor("window ready", 1000);
});

afterAll(() => {
	TestContext.end();
});

test("smoke testing: open window", async () => {
	const nativeWindow = TestContext.begin();
	await waitFor("window active", 1000);

	expect(nativeWindow.GetTitle()).toEqual(TestContext.defaultWindowTitle);
});
