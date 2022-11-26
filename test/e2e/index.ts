import path from "path";
import { execJest } from "../ave-testing";

async function main() {
	const cases = [path.resolve(__dirname, "./smoke.test.tsx")];
	cases.forEach((each) => {
		execJest({ absolutePath: each });
	});
}

main();
