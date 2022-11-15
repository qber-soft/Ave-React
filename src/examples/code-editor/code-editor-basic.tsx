import { Vec4 } from "ave-ui";
import React from "react";
import { Window, CodeEditor, ICodeEditorStyle } from "../../ave-react";
import { DemoLayout } from "../common";

const style: ICodeEditorStyle = {
	defaultVisualStyle: {
		textColor: new Vec4(0, 0, 0, 255),
	},
	defaultFontStyle: {
		size: 13,
	},
};

export function TestCodeEditorBasic() {
	return (
		<Window title="CodeEditor Basic">
			<DemoLayout width="500dpx" height="300dpx">
				<CodeEditor style={style}></CodeEditor>
			</DemoLayout>
		</Window>
	);
}
