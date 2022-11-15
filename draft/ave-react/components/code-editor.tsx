import { AveComponent, ComponentConfig, IComponentProps, IComponentStyle, registerComponent } from "./common";
import { AppContainer } from "../renderer";
import { Byo2Font, CodeEditor as NativeCodeEditor, CodeEditorStyleItem, Vec4 } from "ave-ui";

export interface ICodeEditorComponentProps extends IComponentProps {
	style?: ICodeEditorStyle;
}

export interface ICodeEditorStyle extends IComponentStyle {
	defaultVisualStyle?: ICodeEditorVisualStyle;
	defaultFontStyle?: ICodeEditorFontStyle;
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
		return this.editor;
	}

	protected onUpdateProp(propName: keyof ICodeEditorComponentProps, propValue: any) {
		switch (propName) {
			case "style": {
				this.setValueForStyles(propValue ?? {});
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

				case "defaultFontStyle": {
					const item = this.createFontStyleItem(styles.defaultFontStyle ?? {});
					this.editor.VsSetFont(StyleIndex.Default, item);
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
