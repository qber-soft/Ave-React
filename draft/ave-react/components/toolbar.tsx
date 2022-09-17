import { DpiSize, IconSource, Menu, MenuItem, MenuType, StringKey, ToolBar as NativeToolbar, ToolBarItem, ToolBarItemType, Vec4 } from "ave-ui";
import { AveComponent, ComponentConfig, IComponentProps, IComponentStyle, registerComponent } from "./common";
import { AppContainer, getAppContext } from "../renderer";

interface IToolbarItemBase {
	type: ToolBarItemType;
	id?: number;
	strKey?: StringKey;
	name?: string;
	icon?: string;
	iconSize?: number;
}

export type IToolbarItem = IToolbarMenu | IToolbarButton;

export interface IToolbarButton extends IToolbarItemBase {
	type: ToolBarItemType.Button;
	onClick?: (sender: Menu, id: number) => void;
}

export interface IToolbarMenu extends IToolbarItemBase {
	type: ToolBarItemType.Menu | ToolBarItemType.ButtonDrop;
	items: IToolbarMenuItem[];
	defaultRadioId?: number;
	onClick?: (sender: Menu, id: number) => void;
}

export interface IToolbarMenuItem {
	id: number;
	name?: string;
	icon?: string;
	iconSize?: number;
	strKey?: StringKey;
	subMenu?: {
		children: IToolbarMenuItem[];
		onClick?: (sender: Menu, id: number) => void;
	};
}

export interface IToolbarStyle extends IComponentStyle {
	textColor?: Vec4;
}

export type ToolbarPosition = "left" | "right";

export interface IToolbarComponentProps extends IComponentProps {
	strKey?: StringKey;
	items?: IToolbarItem[];
	withBackground?: boolean;
	style?: IToolbarStyle;
	position?: ToolbarPosition;
	onClick?: (sender: NativeToolbar, id: number) => void;
}

export class ToolbarComponent extends AveComponent<IToolbarComponentProps> {
	static tagName = "ave-toolbar";

	private toolbar: NativeToolbar;
	private position: ToolbarPosition;

	protected onCreateUI() {
		this.toolbar = new NativeToolbar(this.window, this.props?.strKey);

		//
		this.position = this.props?.position ?? "left";
		this.onUpdateProp("withBackground", false);

		//
		const context = getAppContext();
		const resMap = context.getIconResourceMap();
		this?.props?.items.forEach((toolbarItem, index /** index 0 is reserved */) => {
			// toolbar item: -1: push back
			// icon: 0 : no icon
			const id = toolbarItem?.id ?? index + 1;

			// add toolbar item
			const iconSize = toolbarItem?.iconSize ?? 16;
			const icon = toolbarItem?.icon ? this.window.CacheIcon(new IconSource(resMap[toolbarItem?.icon], iconSize)) : 0;
			if (toolbarItem.name) {
				this.toolbar.ToolInsert(new ToolBarItem(id, toolbarItem.type, icon, DpiSize.FromPixelScaled(0), toolbarItem.name, ""), -1);
			} else {
				this.toolbar.ToolInsert(new ToolBarItem(id, toolbarItem.type, icon), -1);
			}

			// assign control as toolbar item
			if (toolbarItem.type === ToolBarItemType.Menu || toolbarItem.type === ToolBarItemType.ButtonDrop) {
				this.toolbar.DropSetById(id, this.createMenu(toolbarItem));
			} else if (toolbarItem.type === ToolBarItemType.Button) {
			}
		});
		return this.toolbar;
	}

	private createMenu(toolbarItem: IToolbarMenu) {
		const context = getAppContext();
		const resMap = context.getIconResourceMap();
		const menu = new Menu(this.window, toolbarItem?.strKey);
		(Object.keys(toolbarItem) as Array<keyof IToolbarMenu>).forEach((propName) => {
			switch (propName) {
				case "defaultRadioId": {
					menu.SetRadioId(toolbarItem.defaultRadioId ?? 1);
					break;
				}
				case "onClick": {
					menu.OnClick(toolbarItem.onClick.bind(toolbarItem));
					break;
				}
				case "items": {
					toolbarItem.items.forEach((menuItem, index) => {
						const iconSize = menuItem?.iconSize ?? 16;
						const icon = menuItem?.icon ? this.window.CacheIcon(new IconSource(resMap[menuItem?.icon], iconSize)) : 0;

						if (menuItem.subMenu) {
							const subMenuDesc = menuItem.name ? new MenuItem(menuItem.id, MenuType.Text, icon, menuItem.name) : new MenuItem(menuItem.id, MenuType.Text, icon);
							const subMenu = menu.InsertSubMenu(subMenuDesc);
							if (menuItem.strKey) {
								this.window.GetControlManager().AddControl(subMenu, menuItem.strKey);
							}
							menuItem.subMenu.children.forEach((subMenuItem) => {
								const iconSize = subMenuItem?.iconSize ?? 16;
								const icon = subMenuItem?.icon ? this.window.CacheIcon(new IconSource(resMap[subMenuItem?.icon], iconSize)) : 0;
								if (subMenuItem.name) {
									subMenu.InsertItem(new MenuItem(subMenuItem.id, MenuType.Text, icon, subMenuItem.name));
								} else {
									subMenu.InsertItem(new MenuItem(subMenuItem.id, MenuType.Text, icon));
								}
							});
							if (menuItem.subMenu.onClick) {
								subMenu.OnClick(menuItem.subMenu.onClick.bind(menuItem.subMenu));
							}
						} else {
							if (menuItem.name) {
								menu.InsertItem(new MenuItem(menuItem.id, MenuType.Text, icon, menuItem.name));
							} else {
								menu.InsertItem(new MenuItem(menuItem.id, MenuType.Text, icon));
							}
						}
					});
					break;
				}
			}
		});
		return menu;
	}

	getPosition(): ToolbarPosition {
		return this.position ?? "left";
	}

	protected onUpdateProp(propName: keyof IToolbarComponentProps, propValue: any) {
		switch (propName) {
			case "style": {
				this.setValueForStyles(propValue);
				break;
			}

			case "withBackground": {
				this.toolbar.SetBackground(propValue ?? false);
				break;
			}

			case "onClick": {
				this.toolbar.OnClick(propValue ?? (() => {}));
				break;
			}
		}
	}

	private setValueForStyles(styles: IToolbarStyle = {}) {
		(Object.keys(styles) as Array<keyof IToolbarStyle>).forEach((styleName) => {
			switch (styleName) {
				case "textColor": {
					this.toolbar.SetTextColor(styles.textColor ?? new Vec4(0, 0, 0, 255));
					break;
				}
			}
		});
	}
}

class Config extends ComponentConfig {
	tagName = ToolbarComponent.tagName;

	createInstance(initProps: any, app: AppContainer, context: any): any {
		return new ToolbarComponent(initProps);
	}
}

export const Toolbar = registerComponent<IToolbarComponentProps>(new Config());
