import { startAveDevtoolBackend } from "./ave-backend";
import { startChromeDevtoolBackend } from "./cdp-backend";

export function startDevtoolBackend() {
	console.log(`[dev] start devtool backend`);

	startAveDevtoolBackend();
	startChromeDevtoolBackend();
}
