import path from "path";

const iconResource = {
	size: [16],
	path: {
		windowIcon: [path.resolve(__dirname, "../assets/color-wheel.png")],
	},
} as const;

export { iconResource };

export type IconResourceMapType = Record<keyof typeof iconResource.path, number>;
