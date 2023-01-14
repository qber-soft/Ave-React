import path from "path";
import { execJest } from "../common";

async function main() {
	// prettier-ignore
	const components = [
		"window", 
		"grid",
		"button",
		"label",
		"text-box",
		"image",
		"hyperlink"
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

	const errors = [];
	cases.forEach((each) => {
		try {
			execJest(each);
		} catch (error) {
			errors.push(error);
		}
	});

	if (errors.length !== 0) {
		console.error("Test Failed!");
		process.exit(1);
	}
}

main();
