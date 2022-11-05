import { parseSize, AveComponent, ComponentConfig, IComponentProps, IComponentStyle, IGridArea, registerComponent, parseMargin } from "./common";
import { Grid as NativeGrid, Vec4, DockMode } from "ave-ui";
import { AppContainer } from "../renderer";
import * as Trace from "../dev/trace";

export interface IGridComponentProps extends IComponentProps {
	style?: IGridStyle;
	dockMode?: DockMode;
}

export interface IGridStyle extends IComponentStyle {
	backgroundColor?: Vec4;
	opacity?: number;
	layout?: IGridLayout;
}

export interface IGridLayout {
	/**
	 * whitespace sperated sizes, eg. "1 50px 100dpx"
	 */
	columns?: string;
	rows?: string;
	areas?: Record<string, IGridArea>;
}

export class GridComponent extends AveComponent<IGridComponentProps> {
	static tagName = "ave-grid";

	private grid: NativeGrid;

	onCreateUI() {
		this.grid = new NativeGrid(this.window);
		return this.grid;
	}

	afterCreateUI(): void {
		super.afterCreateUI();
		if (!this?.props?.style?.layout) {
			this.setLayout({
				columns: "1",
				rows: "1",
			});
		}

		this.children.forEach((child) => {
			this.addControl(child);
			if (child instanceof GridComponent) {
				// some props can only be set after child is created
				["dockMode"].forEach((propName) => {
					if (propName in child.props) {
						const propValue = child.props[propName];
						child.onUpdateProp(propName as keyof IGridComponentProps, propValue);
					}
				});
			}
		});
	}

	protected onUpdateProp(propName: keyof IGridComponentProps, propValue: any) {
		switch (propName) {
			case "style": {
				this.setValueForStyles(propValue);
				break;
			}
			case "dockMode": {
				this.gridControl?.SetDock(propValue ?? DockMode.Fill);
				break;
			}
		}
	}

	private setValueForStyles(styles: IGridStyle = {}) {
		(Object.keys(styles) as Array<keyof IGridStyle>).forEach((styleName) => {
			switch (styleName) {
				case "backgroundColor": {
					const color = styles.backgroundColor ?? new Vec4(0, 146, 255, 255 * 0.75); /** blue */
					this.grid.SetBackColor(color);
					break;
				}
				case "opacity": {
					const opacity = styles.opacity ?? 1;
					this.grid.SetOpacity(opacity);
					break;
				}
				case "layout": {
					this.setLayout(
						styles.layout ?? {
							columns: "1",
							rows: "1",
						}
					);
					break;
				}
			}
		});
	}

	private setLayout(layout: IGridLayout) {
		const { columns, rows } = layout;
		if (columns) {
			columns
				.trim()
				.split(" ")
				.forEach((col) => this.grid.ColAdd(parseSize(col)));
		}
		if (rows) {
			rows.trim()
				.split(" ")
				.forEach((row) => this.grid.RowAdd(parseSize(row)));
		}
	}

	appendChild(child: GridComponent): void {
		super.appendChild(child);

		// for update ui after first render
		if (this.created) {
			this.addControl(child);

			// TODO: redraw, so we can see update immediately, but how about performance?
			// this.window.Redraw();
		}
	}

	private addControl(child: AveComponent) {
		{
			("use trace");
			id: "auto";
		}
		{
			("use trace");
			start: (id: number) => ({
				id,
				name: "addControl",
				type: `${this["__type__"]}-${this["__id__"]}`,
				detail: {
					parent: this,
					child,
				},
			});
		}

		const childControl = child.createUI(this.window);
		const childArea = child?.props?.style?.area ?? { row: 0, column: 0, rowSpan: 1, columnSpan: 1 };
		this.grid.ControlAdd(childControl).SetGrid(childArea.column ?? 0, childArea.row ?? 0, childArea.columnSpan ?? 1, childArea.rowSpan ?? 1);
		child.parentGrid = this.grid;

		if (child?.props?.style?.margin) {
			const margin = parseMargin(child?.props?.style?.margin);
			child.gridControl?.SetMargin(margin);
		}

		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "addControl",
				detail: {
					childArea,
				},
			});
		}
	}
}

class Config extends ComponentConfig {
	tagName = GridComponent.tagName;

	createInstance(initProps: IGridComponentProps, app: AppContainer, context: any): any {
		return new GridComponent(initProps);
	}
}

export const Grid = registerComponent<IGridComponentProps>(new Config());
