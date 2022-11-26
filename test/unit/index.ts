import childProcess from "child_process";
import path from "path";
import fs from "fs";
import { projectRoot } from "../common";

async function main() {
	const jestPath = path.resolve(projectRoot, "./node_modules/jest/bin/jest.js");
	const args = ["test/unit", "--coverage"].join(" ");
	const command = `node "${jestPath}" ${args}`;
	childProcess.execSync(command);
	fs.renameSync(path.resolve(projectRoot, "./coverage/coverage-final.json"), path.resolve(projectRoot, `./coverage/coverage-final-unit.json`));
}

main();
