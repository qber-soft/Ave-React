import React from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridMargin() {
	return (
		<Window title="Grid Margin">
			<Grid>
				<Grid style={{ backgroundColor: Color.DanShuHong, margin: "10px 20px 30px 40px" }}></Grid>
			</Grid>
		</Window>
	);
}
