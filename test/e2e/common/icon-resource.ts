import path from "path";

export function assetsPath(name: string) {
	const root = path.resolve(__dirname, "../../../assets");
	return path.resolve(root, `./${name}`);
}

const iconResource = {
	size: [16],
	path: {
		"open-file": [assetsPath("open-file#0.png")],
		"open-recent": [assetsPath("open-recent.png")],
	},
} as const;

export { iconResource };

export type IconResourceMapType = Record<keyof typeof iconResource.path, number>;
