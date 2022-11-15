import { Vec4 } from "ave-ui";
import React from "react";
import { Window, CodeEditor, ICodeEditorComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

const defaultVisualStyle: ICodeEditorComponentProps["defaultVisualStyle"] = {
	textColor: new Vec4(255, 0, 0, 255),
};

export function TestCodeEditorBasic() {
	return (
		<Window title="CodeEditor Basic">
			<DemoLayout width="500dpx" height="300dpx">
				<CodeEditor defaultVisualStyle={defaultVisualStyle}></CodeEditor>
			</DemoLayout>
		</Window>
	);
}
