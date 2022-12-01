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
	private layout: IGridLayout;

	onCreateUI() {
		this.grid = new NativeGrid(this.window);
		this.layout = {
			columns: "",
			rows: "",
		};
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
		const { columns = "", rows = "" } = layout;

		//
		const newColumnList = columns.trim().split(" ");
		const oldColumnList = (this.layout?.columns ?? "1").trim().split(" ");
		newColumnList.forEach((column, index) => {
			const prevColumn = oldColumnList[index];
			if (!prevColumn) {
				this.grid.ColInsert(index, parseSize(column));
			} else {
				if (prevColumn === column) {
					// skip it
				} else {
					this.grid.ColRemove(index);
					this.grid.ColInsert(index, parseSize(column));
				}
			}
		});

		if (newColumnList.length < oldColumnList.length) {
			for (let i = oldColumnList.length - 1; i >= newColumnList.length; --i) {
				this.grid.ColRemove(i);
			}
		}

		//
		const newRowList = rows.trim().split(" ");
		const oldRowList = (this.layout?.rows ?? "1").trim().split(" ");
		newRowList.forEach((row, index) => {
			const prevRow = oldRowList[index];
			if (!prevRow) {
				this.grid.RowInsert(index, parseSize(row));
			} else {
				if (prevRow === row) {
					// skip it
				} else {
					this.grid.RowRemove(index);
					this.grid.RowInsert(index, parseSize(row));
				}
			}
		});

		if (newRowList.length < oldRowList.length) {
			for (let i = oldRowList.length - 1; i >= newRowList.length; --i) {
				this.grid.RowRemove(i);
			}
		}

		this.layout = { ...layout };
	}

	appendChild(child: AveComponent): void {
		super.appendChild(child);

		// for update ui after first render
		if (this.created) {
			this.addControl(child);

			// TODO: redraw, so we can see update immediately, but how about performance?
			// this.window.Redraw();
		}
	}

	insertBefore(child: AveComponent<IGridComponentProps>, beforeChild: AveComponent<IGridComponentProps>): void {
		super.insertBefore(child, beforeChild);

		// for update ui after first render
		if (this.created) {
			this.addControl(child);
		}
	}

	removeChild(child: AveComponent): void {
		super.removeChild(child);
		this.grid.ControlRemove(child.nativeControl);
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
