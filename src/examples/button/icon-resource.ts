import { assetsPath } from "../common";

const iconResource = {
	size: [16],
	path: {
		"open-file": [assetsPath("open-file#0.png")],
	},
} as const;

export { iconResource };

export type IconResourceMapType = Record<keyof typeof iconResource.path, number>;
