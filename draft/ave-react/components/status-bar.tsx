import { AveComponent, ComponentConfig, IComponentProps, registerComponent } from "../components";
import { AppContainer } from "../renderer";
import { StatusBar as NativeStatusBar, IStatusBar } from "ave-ui";
import { parseSize } from "./common";

export interface IStatusBarComponentProps extends IComponentProps {
	parts: IStatusBarPart[];
	onClick?: Parameters<IStatusBar["OnClick"]>[0];
}

export interface IStatusBarPart {
	size: string;
	text?: string;
	clickable?: boolean;
}

class StatusBarComponent extends AveComponent<IStatusBarComponentProps> {
	static tagName = "ave-status-bar";

	private statusBar: NativeStatusBar;

	protected onCreateUI() {
		this.statusBar = new NativeStatusBar(this.window);
		return this.statusBar;
	}

	protected onUpdateProp(propName: keyof IStatusBarComponentProps, propValue: any) {
		switch (propName) {
			case "parts": {
				this.setValueForParts(propValue ?? []);
				break;
			}

			case "onClick": {
				this.statusBar.OnClick(propValue ?? (() => {}));
				break;
			}
		}
	}

	private setValueForParts(parts: IStatusBarComponentProps["parts"]) {
		if (parts.length !== 0) {
			const partSizeList = parts.map((each) => parseSize(each.size));
			this.statusBar.SetPart(partSizeList);

			parts.forEach((part, index) => {
				for (const key in part) {
					const value = part[key];
					switch (key as keyof IStatusBarPart) {
						case "text": {
							this.statusBar.SetText(index, value ?? "");
							break;
						}

						case "clickable": {
							this.statusBar.SetClickable(index, value ?? false);
							break;
						}
					}
				}
			});
		}
	}
}

class Config extends ComponentConfig {
	tagName = StatusBarComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new StatusBarComponent(initProps);
	}
}

export const StatusBar = registerComponent<IStatusBarComponentProps>(new Config());
