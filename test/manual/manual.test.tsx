import React from "react";
import { Grid, TextBox } from "../../src/ave-react";
import { setupJest, TestContext, waitForTestEnd } from "./common";

setupJest();

describe("manual test", () => {
	test("TextBox: IME", async () => {
		function TestCase() {
			return (
				<Grid id="root">
					<TextBox ime></TextBox>
				</Grid>
			);
		}

		await TestContext.render(<TestCase />);
		await waitForTestEnd();
	});
});
