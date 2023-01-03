import path from "path";

export const projectRoot = path.resolve(__dirname, "../../");

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export enum WaitForDelay {
	ClickCallback = 100,
	ChangeCallback = 100,
}

export async function waitFor(reason: string, time: number) {
	console.log(`[waitFor] reason: ${reason}, time: ${time}`);
	await sleep(time);
}
