import { Vec4 } from "ave-ui";
import React from "react";
import { Window, Knob } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestKnobBasic() {
	return (
		<Window title="Knob Basic">
			<DemoLayout height="80dpx">
				<Knob text="volume" style={{ ringColor: new Vec4(0, 146, 255, 255 * 0.75) }}></Knob>
			</DemoLayout>
		</Window>
	);
}
