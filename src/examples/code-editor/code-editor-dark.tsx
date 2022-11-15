import { CodeEditorMarginType, ThemePredefined_Dark, Vec4 } from "ave-ui";
import React, { useEffect } from "react";
import { Window, CodeEditor, ICodeEditorStyle, StyleIndex, getAppContext } from "../../ave-react";
import { DemoLayout } from "../common";

const style: ICodeEditorStyle = {
	defaultVisualStyle: {
		textColor: new Vec4(170, 180, 180, 255),
	},
	defaultFontStyle: {
		size: 14,
	},
	lineNumberFontStyle: {
		size: 14,
	},
	lineNumberVisualStyle: {
		textColor: new Vec4(50, 150, 200, 255),
	},
	editorMargin: {
		type: CodeEditorMarginType.LineNumber,
		styleIndex: StyleIndex.LineNumber,
	},
	caretColor: new Vec4(255, 255, 255, 255 * 0.75),
};

export function TestCodeEditorDark() {
	const text = `console.log("Dark Theme, Hello World!");`;

	useEffect(() => {
		const context = getAppContext();
		const themeImage = context.getThemeImage();
		const themeDark = new ThemePredefined_Dark();
		themeDark.SetStyle(themeImage, 0);
	}, []);

	return (
		<Window title="CodeEditor Dark">
			<DemoLayout width="500dpx" height="300dpx">
				<CodeEditor style={style} text={text}></CodeEditor>
			</DemoLayout>
		</Window>
	);
}
