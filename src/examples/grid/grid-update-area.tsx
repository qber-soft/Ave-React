import React, { useEffect, useState } from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridUpdateArea() {
	const [shouldUpdate, setShouldUpdate] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			console.log(`update grid area`);
			setShouldUpdate(true);
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
		<Window title="Grid Update Area">
			<Grid style={{ backgroundColor: Color.White, layout: containerLayout }}>
				<Grid style={{ backgroundColor: Color.DarkBlue, area: shouldUpdate ? containerLayout.areas.right : containerLayout.areas.left }}></Grid>
			</Grid>
		</Window>
	);
}
