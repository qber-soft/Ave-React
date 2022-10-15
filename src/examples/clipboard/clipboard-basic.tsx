import { AveGetClipboard } from "ave-ui";
import React from "react";
import { Window, Button, IButtonComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestClipboardBasic() {
	const onInspectClipboard: IButtonComponentProps["onClick"] = () => {
		const clipboard = AveGetClipboard();
		if (clipboard.HasImage()) {
			const aveImage = clipboard.GetImage();
			const imageData = aveImage.GetImage(0, 0, 0);
			console.log(`image found! width: ${imageData.Width} height: ${imageData.Height}`);
		} else if (clipboard.HasFile()) {
			const [file] = clipboard.GetFile();
			console.log(`file found! path: ${file}`);
		} else {
			console.log(`nothing found in clipboard`);
		}
	};

	return (
		<Window title="Clipboard Basic">
			<DemoLayout>
				<Button text="Inspect Clipboard" onClick={onInspectClipboard}></Button>
			</DemoLayout>
		</Window>
	);
}
