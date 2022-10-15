import React from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridOpacity() {
	return (
		<Window title="Grid Opacity">
			<Grid>
				<Grid style={{ backgroundColor: Color.MediumBlue, opacity: 0.3 }}></Grid>
			</Grid>
		</Window>
	);
}
