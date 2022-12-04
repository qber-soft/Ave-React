import React from "react";
import { AveRenderer, Grid, Window } from "../../../src/ave-react";
import { DockMode } from "ave-ui";
import { Color, waitFor } from "../../common";
import { findWindowByTitle, focusWindow, TestContext } from "../common";
import { assertColorAtCenter } from "../common";

jest.setTimeout(60 * 1000);

enum WindowTestCases {
	Opacity = "display transparent window",
}

describe("window", () => {
	test(WindowTestCases.Opacity, async () => {
		function TestWindow() {
			return (
				<Window id="window" title={WindowTestCases.Opacity} withBackground={false}>
					<Grid>
						<Grid dockMode={DockMode.Fill} style={{ opacity: 0.5, backgroundColor: Color.Red }}></Grid>
					</Grid>
				</Window>
			);
		}

		AveRenderer.render(<TestWindow />);
		await waitFor("window ready", 1000);

		const nativeWindow = TestContext.begin();
		await waitFor("window active", 1000);

		TestContext.activeWindow = await findWindowByTitle(WindowTestCases.Opacity);
		await focusWindow(TestContext.activeWindow);

		await assertColorAtCenter("window", "rgb(255,0,0)", false);
		TestContext.end();
	});
});
