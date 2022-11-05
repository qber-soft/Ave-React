import { DpiMargin, DpiSize } from "ave-ui";

export function parseSize(size: string) {
	if (size.endsWith("dpx")) {
		return DpiSize.FromPixelScaled(parseFloat(size.replace("dpx", "")));
	} else if (size.endsWith("px")) {
		return DpiSize.FromPixel(parseFloat(size.replace("px", "")));
	} else {
		return DpiSize.FromSlice(parseFloat(size));
	}
}

export function parseMargin(margin: string) {
	const [l, t, r, b] = margin
		.trim()
		.split(" ")
		.map((each) => parseSize(each));
	return new DpiMargin(l, t, r, b);
}
