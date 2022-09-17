import { Vec4 } from "ave-ui";
import fs from "fs-extra";
import path from "path";
import { cloneObject } from "../../ave-react/dev";

export function saveTrace() {
	const cwd = process.cwd();
	setInterval(() => {
		fs.outputFileSync(path.resolve(cwd, "./temp/trace.json"), JSON.stringify(cloneObject(globalThis.__trace_events__), null, 4));
		console.log("[trace] update");
	}, 5000);
}

// ref: http://zhongguose.com/
export const Color = {
	White: new Vec4(255, 255, 255, 255),
	Grey: new Vec4(255 * 0.9, 255 * 0.9, 255 * 0.9, 255),
	HuangHunHui: new Vec4(71, 75, 76, 255),
	DanShuHong: new Vec4(238, 39, 70, 255),
	DanZiHong: new Vec4(210, 86, 140, 255),
	DingXiangDanZi: new Vec4(233, 215, 223, 255),
	YingCaoZi: new Vec4(192, 111, 152, 255),
	DouKouZi: new Vec4(173, 101, 152, 255),
	JieGengZi: new Vec4(129, 60, 133, 255),
	DarkBlue: new Vec4(0, 146, 255, 255),
	MediumBlue: new Vec4(0, 146, 255, 255 * 0.75),
	LightBlue: new Vec4(0, 146, 255, 255 * 0.5),
};

export function assetsPath(name: string) {
	const root = path.resolve(__dirname, "../../../assets");
	return path.resolve(root, `./${name}`);
}
