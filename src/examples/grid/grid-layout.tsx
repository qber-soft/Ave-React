import React from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridLayout() {
	const containerLayout = {
		columns: "1 1",
		rows: "1",
		areas: {
			left: { row: 0, column: 0 },
			right: { row: 0, column: 1 },
		},
	};
	return (
		<Window title="Grid Layout">
			<Grid style={{ backgroundColor: Color.White, layout: containerLayout }}>
				<Grid style={{ backgroundColor: Color.DarkBlue, area: containerLayout.areas.left }}></Grid>
				<Grid style={{ backgroundColor: Color.DanShuHong, area: containerLayout.areas.right }}></Grid>
			</Grid>
		</Window>
	);
}
