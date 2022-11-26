import path from "path";
import { execJest } from "../common";

async function main() {
	const cases = [path.resolve(__dirname, "./smoke.test.tsx"), path.resolve(__dirname, "./grid/index.test.tsx")];
	cases.forEach((each) => {
		execJest({ absolutePath: each });
	});
}

main();
