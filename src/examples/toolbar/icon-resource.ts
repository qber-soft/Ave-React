import { assetsPath } from "../common";

const iconResource = {
	size: [16],
	path: {
		theme: [assetsPath("theme#19.png")],
		"open-file": [assetsPath("open-file#0.png")],
		"open-recent": [assetsPath("open-recent.png")],
		"js-file": [assetsPath("js.png")],
	},
} as const;

export { iconResource };

export type IconResourceMapType = Record<keyof typeof iconResource.path, number>;
