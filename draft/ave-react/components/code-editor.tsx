import { AveComponent, ComponentConfig, IComponentProps, IComponentStyle, registerComponent } from "./common";
import { AppContainer } from "../renderer";
import { AlignType, Byo2Font, CodeEditor as NativeCodeEditor, CodeEditorMargin, CodeEditorMarginType, CodeEditorStyleItem, Vec4 } from "ave-ui";

export interface ICodeEditorComponentProps extends IComponentProps {
	text?: string;
	readonly?: boolean;
	style?: ICodeEditorStyle;
	onInit?: (editor: NativeCodeEditor) => void;
	// TODO: onChange
}

export interface ICodeEditorStyle extends IComponentStyle {
	defaultVisualStyle?: ICodeEditorVisualStyle;
	defaultFontStyle?: ICodeEditorFontStyle;
	lineNumberVisualStyle?: ICodeEditorVisualStyle;
	lineNumberFontStyle?: ICodeEditorFontStyle;
	editorMargin?: ICodeEditorMargin;
	caretColor?: Vec4;
}

export interface ICodeEditorMargin {
	type: CodeEditorMarginType;
	styleIndex: number;
	align?: AlignType;
}

export interface ICodeEditorVisualStyle {
	textColor?: Vec4;
}

export interface ICodeEditorFontStyle {
	size?: number;
}

export enum StyleIndex {
	Default,
	LineNumber,

	Count,
}

class CodeEditorComponent extends AveComponent<ICodeEditorComponentProps> {
	static tagName = "ave-code-editor";

	private editor: NativeCodeEditor;
	protected onCreateUI() {
		this.editor = new NativeCodeEditor(this.window);
		this.editor.VsReset(StyleIndex.Count);
		if (this.props?.onInit) {
			this.props?.onInit(this.editor);
		}
		return this.editor;
	}

	protected onUpdateProp(propName: keyof ICodeEditorComponentProps, propValue: any) {
		switch (propName) {
			case "style": {
				this.setValueForStyles(propValue ?? {});
				break;
			}

			case "readonly": {
				const doc = this.editor.DocGet();
				doc.SetReadOnly(propValue ?? false);
				break;
			}

			case "text": {
				// TODO: support text update without remove?
				const doc = this.editor.DocGet();
				doc.CharRemove(0, doc.GetLength());
				doc.CharInsert(0, propValue ?? "");
				break;
			}
		}
	}

	private setValueForStyles(styles: ICodeEditorStyle = {}) {
		(Object.keys(styles) as Array<keyof ICodeEditorStyle>).forEach((styleName) => {
			switch (styleName) {
				case "defaultVisualStyle": {
					const item = this.createVisualStyleItem(styles.defaultVisualStyle ?? {});
					this.editor.VsSetStyle(StyleIndex.Default, item);
					break;
				}

				case "lineNumberVisualStyle": {
					const item = this.createVisualStyleItem(styles.lineNumberVisualStyle ?? {});
					this.editor.VsSetStyle(StyleIndex.LineNumber, item);
					break;
				}

				case "defaultFontStyle": {
					const item = this.createFontStyleItem(styles.defaultFontStyle ?? {});
					this.editor.VsSetFont(StyleIndex.Default, item);
					break;
				}

				case "lineNumberFontStyle": {
					const item = this.createFontStyleItem(styles.lineNumberFontStyle ?? {});
					this.editor.VsSetFont(StyleIndex.LineNumber, item);
					break;
				}

				case "editorMargin": {
					const margin = new CodeEditorMargin();
					margin.Type = styles.editorMargin?.type ?? CodeEditorMarginType.LineNumber;
					margin.Style = styles.editorMargin?.styleIndex ?? StyleIndex.LineNumber;
					margin.Align = styles.editorMargin?.align ?? AlignType.Far;
					this.editor.VmAdd(margin);
					break;
				}

				case "caretColor": {
					this.editor.ViewSetCaretColor(styles.caretColor ?? new Vec4(255, 255, 255, 255));
					break;
				}
			}
		});
	}

	private createVisualStyleItem(style: ICodeEditorVisualStyle = {}) {
		const item = new CodeEditorStyleItem();
		for (const styleName in style) {
			const styleValue = style[styleName];
			switch (styleName) {
				case "textColor": {
					item.Color.Text = styleValue;
					break;
				}
			}
		}
		return item;
	}

	private createFontStyleItem(style: ICodeEditorFontStyle = {}) {
		const fd = { ...this.window.GetTheme().GetFont() };
		for (const styleName in style) {
			const styleValue = style[styleName];
			switch (styleName) {
				case "size": {
					fd.Size = styleValue;
					break;
				}
			}
		}

		const item = new Byo2Font(this.window, fd);
		return item;
	}
}

class Config extends ComponentConfig {
	tagName = CodeEditorComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new CodeEditorComponent(initProps);
	}
}

export const CodeEditor = registerComponent<ICodeEditorComponentProps>(new Config());
