import path from "path";
import { execJest } from "../common";

async function main() {
	// prettier-ignore
	const components = [
		"window", 
		"grid"
	];
	// prettier-ignore
	const cases = [
		path.resolve(__dirname, "./smoke.test.tsx"), 
		...components.map((each) => path.resolve(__dirname, `./${each}/index.test.tsx`))
	];
	cases.forEach((each) => {
		execJest({ absolutePath: each });
	});
}

main();
