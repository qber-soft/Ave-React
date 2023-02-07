import { CodeEditorMarginType, Vec4 } from "ave-ui";
import React from "react";
import { Window, CodeEditor, ICodeEditorStyle, StyleIndex } from "../../ave-react";
import { DemoLayout } from "../common";

const style: ICodeEditorStyle = {
	defaultVisualStyle: {
		textColor: new Vec4(255, 0, 0, 255),
	},
	defaultFontStyle: {
		size: 12,
	},
	lineNumberVisualStyle: {
		textColor: new Vec4(0, 0, 255, 255),
	},
	lineNumberFontStyle: {
		size: 12,
	},
	editorMargin: {
		type: CodeEditorMarginType.LineNumber,
		styleIndex: StyleIndex.LineNumber,
	},
	caretColor: new Vec4(0, 255, 0, 255),
};

export function TestCodeEditorBasic() {
	const text = `console.log("Hello World!");`;

	return (
		<Window title="CodeEditor Basic">
			<DemoLayout width="500dpx" height="300dpx">
				<CodeEditor style={style} text={text}></CodeEditor>
			</DemoLayout>
		</Window>
	);
}
