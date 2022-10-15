import React from "react";
import { DockMode, Vec4 } from "ave-ui";
import { Grid, Window } from "../../ave-react";

export function TestWindowOpacity() {
	return (
		<Window withBackground={false}>
			<Grid>
				<Grid dockMode={DockMode.Fill} style={{ opacity: 0.3, backgroundColor: new Vec4(100, 149, 237, 255) }}></Grid>
			</Grid>
		</Window>
	);
}
