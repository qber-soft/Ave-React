import React from "react";
import { Window, Hyperlink } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestHyperlinkBasic() {
	return (
		<Window title="Hyperlink Basic">
			<DemoLayout>
				<Hyperlink text="<https://github.com/>" />
			</DemoLayout>
		</Window>
	);
}
