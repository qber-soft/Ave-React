import React from "react";
import { AveRenderer } from "../../../src/ave-react";
import { waitFor } from "../../common";
import { TestContext, ManualTestWindow } from "../common";

export function setupJest() {
	jest.setTimeout(60 * 1000);

	beforeAll(async () => {
		AveRenderer.render(<ManualTestWindow />);
		await waitFor("window ready", 1000);

		TestContext.nativeWindow = TestContext.begin();
		await waitFor("window active", 1000);
	});

	afterEach(async () => {
		await TestContext.render(<></>);

		expect(TestContext.result).toEqual(true);

		TestContext.result = null;
	});

	afterAll(() => {
		TestContext.end();
	});
}

export function waitForTestEnd() {
	return new Promise((resolve, reject) => {
		const timer = setInterval(() => {
			if (TestContext.result !== null) {
				clearInterval(timer);
				resolve(true);
			}
		}, 1000);
	});
}
