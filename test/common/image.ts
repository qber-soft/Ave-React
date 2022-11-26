import fs from "fs";
import path from "path";
import { projectRoot } from "./utils";
import { FileType, Region, screen } from "@nut-tree/nut-js";

export async function saveRegionImage(region: Region, name = `${Date.now()}`, folder = path.resolve(projectRoot, `./test-out`)) {
	const filePath = await screen.captureRegion(name, region, FileType.PNG, folder);
	console.log(`[save region image]: ${filePath}`);
	const image = fs.readFileSync(filePath);
	return image;
}
