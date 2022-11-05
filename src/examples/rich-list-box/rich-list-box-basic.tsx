import React from "react";
import { Window, RichListBox } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestRichListBoxBasic() {
	return (
		<Window title="RichListBox Basic">
			<DemoLayout width="410dpx" height="300dpx">
				<RichListBox></RichListBox>
			</DemoLayout>
		</Window>
	);
}
