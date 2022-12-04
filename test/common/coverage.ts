import childProcess from "child_process";
import path from "path";
import fs from "fs";
import istanbul from "istanbul";
import { projectRoot } from "./utils";

export type ExecJestConfig = {
	absolutePath: string;
	name: string;
};

function renameCoverageFile(name: string) {
	const timestamp = Date.now();
	fs.renameSync(path.resolve(projectRoot, "./coverage/coverage-final.json"), path.resolve(projectRoot, `./coverage/coverage-final-${name}-${timestamp}.json`));
}

// https://github.com/facebook/jest/issues/2418
export function mergeCoverage() {
	const collector = new istanbul.Collector();
	const reporter = new istanbul.Reporter();
	const sync = false;

	const filePaths = fs.readdirSync(path.resolve(projectRoot, "./coverage"));
	console.log(`coverage file paths`, filePaths);

	filePaths.forEach((relativePath) => {
		if (relativePath.includes("coverage-final-")) {
			const coverage = require(path.resolve(projectRoot, `./coverage/${relativePath}`));
			collector.add(coverage);
			console.log(`merge coverage file: ${relativePath}`);
		}
	});

	reporter.addAll(["html", "lcov", "text", "clover", "json"]);
	reporter.write(collector, sync, () => {
		console.log("all reports generated");
	});
}

export function execJest(config: ExecJestConfig) {
	const jestPath = path.resolve(projectRoot, "./node_modules/jest/bin/jest.js");
	const args = ["--coverage", "--runInBand", `--runTestsByPath "${config.absolutePath}"`].join(" ");
	const command = `node "${jestPath}" ${args}`;
	console.log(`exec command: ${command}`);
	childProcess.execSync(command);
	renameCoverageFile(config.name);
}
