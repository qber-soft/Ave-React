import { centerOf, screen } from "@nut-tree/nut-js";
import { getComponentById } from "../../ave-testing";
import { saveRegionImage } from "../../common";
import { getRegionRelativeToScreenForComponent } from "./nutjs";
import { TestContext } from "./window";

export async function imageSnapshotTest(id: string) {
	const component = getComponentById(id);
	const region = await getRegionRelativeToScreenForComponent(TestContext.activeWindow, component);
	const image = await saveRegionImage(region);
	expect(image).toMatchImageSnapshot();
}

export async function assertColorAtCenter(id: string, color: string, equal = true) {
	const component = getComponentById(id);
	const region = await getRegionRelativeToScreenForComponent(TestContext.activeWindow, component);

	const pos = await centerOf(region);
	const pixel = await screen.colorAt(pos);

	if (equal) {
		expect(pixel.toString()).toEqual(color);
	} else {
		expect(pixel.toString()).not.toEqual(color);
	}
}
