import React from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridBackground() {
	return (
		<Window title="Grid Background">
			<Grid style={{ backgroundColor: Color.DanShuHong }}></Grid>
		</Window>
	);
}
