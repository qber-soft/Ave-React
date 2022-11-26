import path from "path";
import { execJest, mergeCoverage } from "../ave-testing";

async function main() {
	const cases = [path.resolve(__dirname, "./smoke.test.tsx")];
	cases.forEach((each) => {
		execJest({ absolutePath: each });
	});
	mergeCoverage();
}

main();
