import React, { useEffect, useState } from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

const defaultLayout = {
	columns: `1 120dpx 1`,
	rows: `1 32dpx 1`,
	areas: {
		center: { row: 1, column: 1 },
	},
};

export function TestGridUpdateLayout4() {
	const [layout, setLayout] = useState(defaultLayout);

	useEffect(() => {
		setTimeout(() => {
			console.log(`update layout`);
			setLayout({
				columns: `1 100dpx 1`,
				rows: `1 100dpx 1`,
				areas: {
					center: { row: 1, column: 1 },
				},
			});
		}, 2000);
	}, []);

	return (
		<Window title="Grid Update Layout 4">
			<Grid style={{ backgroundColor: Color.DanShuHong, layout: layout }}>
				<Grid style={{ backgroundColor: Color.DarkBlue, area: layout.areas.center }}></Grid>
			</Grid>
		</Window>
	);
}
