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

const defaultValue = {
	backgroundColor: new Vec4(0, 146, 255, 255 * 0.75) /** blue */,
	opacity: 1,
	layout: {
		columns: "1",
		rows: "1",
	},
	area: { row: 0, column: 0, rowSpan: 1, columnSpan: 1 },
	dockMode: DockMode.Fill,
	margin: "0dpx 0dpx 0dpx 0dpx",
};

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
		if (!this.props?.style?.layout) {
			this.setLayout({
				columns: "1",
				rows: "1",
			});
		}

		this.children.forEach((child) => {
			this.addControl(child);
		});
	}

	protected onUpdateProp(propName: keyof IGridComponentProps, propValue: any) {
		switch (propName) {
			case "style": {
				this.setValueForStyles(propValue);
				break;
			}
			case "dockMode": {
				this.gridControl?.SetDock(propValue ?? defaultValue.dockMode);
				break;
			}
		}
	}

	private setValueForStyles(styles: IGridStyle = {}) {
		(Object.keys(styles) as Array<keyof IGridStyle>).forEach((styleName) => {
			switch (styleName) {
				case "backgroundColor": {
					const color = styles.backgroundColor ?? defaultValue.backgroundColor;
					this.grid.SetBackColor(color);
					break;
				}
				case "opacity": {
					const opacity = styles.opacity ?? defaultValue.opacity;
					this.grid.SetOpacity(opacity);
					break;
				}
				case "layout": {
					this.setLayout(styles.layout ?? defaultValue.layout);
					this.updateChildren();
					break;
				}

				case "margin": {
					const margin = parseMargin(styles.margin ?? defaultValue.margin);
					this.gridControl?.SetMargin(margin);
					break;
				}
			}
		});
	}

	private setLayout(layout: IGridLayout) {
		const { columns = "", rows = "" } = layout;

		//
		const newColumnList = columns.trim().split(" ");
		const oldColumnList = (this.layout?.columns ?? defaultValue.layout.columns).trim().split(" ");
		newColumnList.forEach((column, index) => {
			const prevColumn = oldColumnList[index];
			if (!prevColumn) {
				this.grid.ColInsert(index, parseSize(column));
			} else {
				if (prevColumn !== column) {
					this.grid.ColRemove(index);
					this.grid.ColInsert(index, parseSize(column));
				}
				// else skip it
			}
		});

		if (newColumnList.length < oldColumnList.length) {
			for (let i = oldColumnList.length - 1; i >= newColumnList.length; --i) {
				this.grid.ColRemove(i);
			}
		}

		//
		const newRowList = rows.trim().split(" ");
		const oldRowList = (this.layout?.rows ?? defaultValue.layout.rows).trim().split(" ");
		newRowList.forEach((row, index) => {
			const prevRow = oldRowList[index];
			if (!prevRow) {
				this.grid.RowInsert(index, parseSize(row));
			} else {
				if (prevRow !== row) {
					this.grid.RowRemove(index);
					this.grid.RowInsert(index, parseSize(row));
				}
				// else skip it
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

	insertBefore(child: AveComponent, beforeChild: AveComponent): void {
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
		child.parentGrid = this.grid;
		this.grid.ControlAdd(childControl);
		this.updateChildControl(child);

		{
			("use trace");
			end: (id: number) => ({
				id,
				name: "addControl",
				detail: {},
			});
		}
	}

	private updateChildControl(child: AveComponent) {
		const childArea = child.props?.style?.area ?? defaultValue.area;
		child?.gridControl.SetGrid(childArea.column ?? defaultValue.area.column, childArea.row ?? defaultValue.area.row, childArea.columnSpan ?? defaultValue.area.columnSpan, childArea.rowSpan ?? defaultValue.area.rowSpan);

		if (child.props?.style?.margin) {
			const margin = parseMargin(child.props?.style?.margin);
			child.gridControl?.SetMargin(margin);
		}
	}

	private updateChildren() {
		if (this.created) {
			this.children.forEach((child) => {
				if (child.created) {
					this.updateChildControl(child);
				}
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
