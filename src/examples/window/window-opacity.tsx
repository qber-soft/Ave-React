import React from "react";
import { DockMode } from "ave-ui";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestWindowOpacity() {
	return (
		<Window withBackground={false}>
			<Grid>
				<Grid dockMode={DockMode.Fill} style={{ opacity: 0.3, backgroundColor: Color.White }}></Grid>
			</Grid>
		</Window>
	);
}
