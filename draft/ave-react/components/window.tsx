import { App, ThemeImage, Window as NativeWindow, WindowCreation, WindowFlag, Grid as NativeGrid, CultureId } from "ave-ui";
import { DefaultString, AveComponent, ComponentConfig, IComponentProps, registerComponent } from "./common";
import { AppContainer, getAppContext } from "../renderer";
import { GridComponent } from "./grid";
import { ToolbarComponent } from "./toolbar";
import * as Trace from "../dev/trace";

export interface IWindowComponentProps extends IComponentProps {
	title?: string;

	withBackground?: boolean;
	withCaption?: boolean;
	onInit?: (app: App) => void;
	onLanguageChange?: (app: App) => void;
}

class WindowComponent extends AveComponent<IWindowComponentProps> {
	static tagName = "ave-window";

	private app: App;

	init() {
		this.app = new App();
		if (this.props?.onInit) {
			this.props?.onInit(this.app);
		} else {
			this.app.LangSetDefaultString(CultureId.en_us, { ...DefaultString, AppTitle: this.props?.title ?? "Window" });
			this.app.LangSetCurrent(CultureId.en_us);
		}
		const context = getAppContext();
		context.setAveApp(this.app);

		const iconResource = context.getIconResource();
		if (iconResource.size.length > 0) {
			const resMap = this.app.CreateResourceMap(this.app, iconResource.size ?? [], iconResource?.path ?? {});
			context.setIconResourceMap(resMap);
		}

		const theme = new ThemeImage();
		if (!theme) process.exit(-1);
		context.setThemeImage(theme);
	}

	onCreateUI() {
		const context = getAppContext();

		const cpWindow = new WindowCreation();
		cpWindow.Title = this.props.title ?? "Window";
		cpWindow.Flag |= WindowFlag.Layered;
		cpWindow.Theme = context.getThemeImage();

		this.window = new NativeWindow(cpWindow);
		context.setWindow(this.window);

		this.window.OnCreateContent((sender) => {
			super.setInitialProps();

			const resMap = context.getIconResourceMap<{ windowIcon?: number }>();
			if ("windowIcon" in resMap) {
				sender.SetIcon(resMap.windowIcon);
			}

			if (this.children.length === 0) {
				return true;
			}

			const firstGrid = this.checkChildren();
			this.createToolbar();

			const container = firstGrid.createUI(sender);
			{
				("use trace");
				id: "auto";
			}
			{
				("use trace");
				start: (id: number) => {
					const debugOverlay = new NativeGrid(sender);
					globalThis.__debug_overlay__ = debugOverlay;
					globalThis.__first_grid__ = firstGrid["grid"];
					globalThis.__window__ = sender;
					return {
						id,
						name: "addDebugOverlay",
						type: `debug-overlay`,
						detail: {},
					};
				};
			}
			{
				("use trace");
				end: (id: number) => ({
					id,
					name: "addDebugOverlay",
					detail: {},
				});
			}
			sender.SetContent(container);
			return true;
		});
		return this.window;
	}

	private createToolbar() {
		const toolbarChildren = this.children.filter((child) => child instanceof ToolbarComponent);
		// TODO: add toolbar pos
		toolbarChildren.forEach((toolbar) => {
			const ui = toolbar.createUI(this.window);
			const position = (toolbar as ToolbarComponent).getPosition();
			if (position === "left") {
				this.window.GetFrame().SetToolBarLeft(ui);
			} else if (position === "right") {
				this.window.GetFrame().SetToolBarRight(ui);
			}
		});
	}

	private checkChildren() {
		//
		const gridChildren = this.children.filter((child) => child instanceof GridComponent);
		if (gridChildren.length !== 1) {
			throw new Error(`Please use only a single GridComponent as direct children of the WindowComponent, current count: ${gridChildren.length}`);
		}

		const [firstGrid] = gridChildren;
		return firstGrid;
	}

	afterCreateUI(): void {
		// override parent method, don't setInitialProps again
		// for window, it should be called in window.OnCreateContent
		if (!this.window.CreateWindow()) process.exit(-1);

		this.window.SetVisible(true);
		this.window.Activate();
	}

	protected onUpdateProp(propName: keyof IWindowComponentProps, propValue: any) {
		switch (propName) {
			case "title": {
				this.window.SetTitle(propValue);
				break;
			}
			case "withBackground": {
				this.window.SetBackground(propValue ?? true);
				break;
			}
			case "withCaption": {
				this.window.GetFrame().SetCaptionVisible(propValue ?? true);
				break;
			}
			case "onLanguageChange": {
				// FIXME: there is no OnLanguageChange method in app
				// this.app.OnLanguageChange(() => propValue(this.app));
				this.window.OnLanguageChange(() => propValue(this.app));
				break;
			}
		}
	}
}

class Config extends ComponentConfig {
	tagName = WindowComponent.tagName;

	createInstance(initProps: IWindowComponentProps, app: AppContainer, context: any): any {
		return new WindowComponent(initProps);
	}

	finalizeInitialChildren(component: WindowComponent, type: string, props: IWindowComponentProps, rootContainer: AppContainer, hostContext: any) {
		return true;
	}

	commitMount(component: WindowComponent, type: string, props: IWindowComponentProps): void {
		component.init();
		component.createUI(null);
	}
}

export const Window = registerComponent<IWindowComponentProps>(new Config());
