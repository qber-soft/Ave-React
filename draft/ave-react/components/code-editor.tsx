import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "./common";
import { AppContainer } from "../renderer";
import { CodeEditor as NativeCodeEditor, CodeEditorStyleItem, Vec4 } from "ave-ui";

export interface ICodeEditorComponentProps extends IComponentProps {
	defaultVisualStyle?: ICodeEditorVisualStyle;
}

export interface ICodeEditorVisualStyle {
	textColor?: Vec4;
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
			case "defaultVisualStyle": {
				const item = this.createStyleItem(propValue);
				this.editor.VsSetStyle(StyleIndex.Default, item);
				break;
			}
		}
	}

	private createStyleItem(style: ICodeEditorVisualStyle = {}) {
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
}

class Config extends ComponentConfig {
	tagName = CodeEditorComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new CodeEditorComponent(initProps);
	}
}

export const CodeEditor = registerComponent<ICodeEditorComponentProps>(new Config());
