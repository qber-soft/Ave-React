import React from "react";
import { Button, Grid, Window } from "../../ave-react";
import { Color } from "../common";

// reimplement layout in https://github.com/rerender2021/ave-color-picker
const containerLayout = {
	rows: "1",
	columns: "1 192dpx",
	areas: {
		image: { row: 0, column: 0 },
		pixel: { row: 0, column: 1 },
	},
};

const pixelLayout = {
	// prettier-ignore
	rows: [
        "128dpx", /* mini view  */ "4dpx",
        "192dpx", /* zoom view  */ "4dpx",
        "32dpx",  /* color view */ "4dpx",
        "16dpx",  /* pixel pos  */ "4dpx",
        "16dpx",  /* pixel hex */ "4dpx",
        "16dpx",  /* pixel rgba */ "4dpx",
        "32dpx",  /* open file  */ "4dpx",
        "32dpx",  /* paste 		*/
        "1", 
        "16dpx",  /* move: wasd */ "4dpx",
        "16dpx",  /* lock color */ "4dpx",
        "16dpx",  /* open file  */ "4dpx",
        "16dpx",  /* paste      */ "4dpx",
        "16dpx",  /* drop png   */
    ].join(" "),
	columns: "1",
	areas: {
		//
		miniView: { column: 0, row: 0 },
		zoomView: { column: 0, row: 2 },
		colorView: { column: 0, row: 4 },
		pixelPos: { column: 0, row: 6 },
		pixelHex: { column: 0, row: 8 },
		pixelRgba: { column: 0, row: 10 },
		openFile: { column: 0, row: 12 },
		paste: { column: 0, row: 14 },
		//
		usageMove: { column: 0, row: 16 },
		usageLockColor: { column: 0, row: 18 },
		usageOpenFile: { column: 0, row: 20 },
		usagePaste: { column: 0, row: 22 },
		usageDrop: { column: 0, row: 24 },
	},
};

export function TestGridLayoutColorPicker() {
	return (
		<Window title="Layout Color Picker">
			<Grid style={{ backgroundColor: Color.DanShuHong, layout: containerLayout }}>
				<Grid style={{ backgroundColor: Color.DarkBlue, area: containerLayout.areas.image }}></Grid>
				<Grid style={{ backgroundColor: Color.JieGengZi, area: containerLayout.areas.pixel, layout: pixelLayout }}>
					<Button text="Mini View" style={{ area: pixelLayout.areas.miniView }}></Button>
					<Button text="Zoom View" style={{ area: pixelLayout.areas.zoomView }}></Button>
					<Button text="Color View" style={{ area: pixelLayout.areas.colorView }}></Button>
					<Button text="Pixel Pos" style={{ area: pixelLayout.areas.pixelPos }}></Button>
					<Button text="Pixel Hex" style={{ area: pixelLayout.areas.pixelHex }}></Button>
					<Button text="Pixel Rgba" style={{ area: pixelLayout.areas.pixelRgba }}></Button>
					<Button text="Open File" style={{ area: pixelLayout.areas.openFile }}></Button>
					<Button text="Paste" style={{ area: pixelLayout.areas.paste }}></Button>
					<Button text="Usage Move" style={{ area: pixelLayout.areas.usageMove }}></Button>
					<Button text="Usage Lock Color" style={{ area: pixelLayout.areas.usageLockColor }}></Button>
					<Button text="Usage Open File" style={{ area: pixelLayout.areas.usageOpenFile }}></Button>
					<Button text="Usage Paste" style={{ area: pixelLayout.areas.usagePaste }}></Button>
					<Button text="Usage Drop" style={{ area: pixelLayout.areas.usageDrop }}></Button>
				</Grid>
			</Grid>
		</Window>
	);
}
