import React, { useEffect, useState } from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridUpdateLayout3() {
	const [shouldRemove, setShouldRemove] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			console.log(`remove grid`);
			setShouldRemove(true);
		}, 1000);
	}, []);

	const containerLayout = {
		columns: "1 1",
		rows: "1",
		areas: {
			left: { row: 0, column: 0 },
			right: { row: 0, column: 1 },
		},
	};

	return (
		<Window title="Grid Update Layout 3">
			<Grid style={{ backgroundColor: Color.White, layout: containerLayout }}>
				{shouldRemove ? <></> : <Grid id="child 1" style={{ backgroundColor: Color.DanShuHong, area: containerLayout.areas.right }}></Grid>}
				<Grid id="child 2" style={{ backgroundColor: Color.DarkBlue, area: containerLayout.areas.left }}></Grid>
			</Grid>
		</Window>
	);
}
