import { Vec4 } from "ave-ui";
import React from "react";
import { Window, ColorView } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestColorViewBasic() {
	return (
		<Window title="Color View Basic">
			<DemoLayout>
				<ColorView solidColor={new Vec4(100, 149, 237, 255 * 0.8)}></ColorView>
			</DemoLayout>
		</Window>
	);
}
