import path from "path";
import { execJest } from "../common";

async function main() {
	// prettier-ignore
	const components = [
		"window", 
		"grid",
		"button",
		"label"
	];
	// prettier-ignore
	const cases = [
		{
			name: "smoke",
			absolutePath: path.resolve(__dirname, "./smoke.test.tsx")
		}, 
		...components.map((each) => {
			return {
				name: each,
				absolutePath: path.resolve(__dirname, `./${each}/index.test.tsx`)
			}
		})
	];
	cases.forEach((each) => {
		execJest(each);
	});
}

main();
