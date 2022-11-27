import { waitFor } from "../../common";
import { TestContext } from "./window";

export function getUpdateFunction(callback: Function) {
	return async () => {
		await callback();
		await waitFor("fire update", 1000);
		TestContext.nativeWindow.Redraw();
		await waitFor("redraw", 500);
	};
}
