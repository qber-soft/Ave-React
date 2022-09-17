import React, { useEffect, useState } from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridUpdateLayout() {
	const [shouldAppend, setShouldAppend] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			console.log(`append grid`);
			setShouldAppend(true);
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
		<Window title="Grid Update Layout">
			<Grid style={{ backgroundColor: Color.White, layout: containerLayout }}>
				<Grid style={{ backgroundColor: Color.DarkBlue, area: containerLayout.areas.left }}></Grid>
				{shouldAppend ? <Grid style={{ backgroundColor: Color.DanShuHong, area: containerLayout.areas.right }}></Grid> : <></>}
			</Grid>
		</Window>
	);
}
