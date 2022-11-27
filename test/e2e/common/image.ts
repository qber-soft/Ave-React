import { centerOf, screen } from "@nut-tree/nut-js";
import { getComponentById } from "../../ave-testing";
import { saveRegionImage } from "../../common";
import { getRegionRelativeToScreenForComponent } from "./nutjs";
import { TestContext } from "./window";

export async function imageSnapshotTest(id: string) {
	const root = getComponentById(id);
	const region = await getRegionRelativeToScreenForComponent(TestContext.activeWindow, root);
	const image = await saveRegionImage(region);
	expect(image).toMatchImageSnapshot();
}

export async function assertColorAtCenter(id: string, color: string) {
	const root = getComponentById(id);
	const region = await getRegionRelativeToScreenForComponent(TestContext.activeWindow, root);

	const pos = await centerOf(region);
	const pixel = await screen.colorAt(pos);
	expect(pixel.toString()).toEqual(color);
}
