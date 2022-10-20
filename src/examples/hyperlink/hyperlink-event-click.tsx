import React from "react";
import { Window, Hyperlink } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestHyperlinkOnClick() {
	return (
		<Window title="Hyperlink onClick">
			<DemoLayout>
				<Hyperlink
					text="<https://github.com/>"
					onClick={() => {
						console.log("hyperlink clicked");
					}}
				/>
			</DemoLayout>
		</Window>
	);
}
