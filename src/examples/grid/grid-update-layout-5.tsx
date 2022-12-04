import React, { useEffect, useState } from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

const defaultLayout = {
	columns: `1 120dpx 1`,
	rows: `1 32dpx 1`,
	areas: {
		child: { row: 1, column: 1 },
	},
};

export function TestGridUpdateLayout5() {
	const [layout, setLayout] = useState(defaultLayout);

	useEffect(() => {
		setTimeout(() => {
			console.log(`update layout`);
			setLayout({
				columns: `1 1 1 100dpx `,
				rows: `100dpx 1 1 1`,
				areas: {
					child: { row: 0, column: 3 },
				},
			});
		}, 2000);
	}, []);

	return (
		<Window title="Grid Update Layout 5">
			<Grid style={{ backgroundColor: Color.DanShuHong, layout: layout }}>
				<Grid style={{ backgroundColor: Color.DarkBlue, area: layout.areas.child }}></Grid>
			</Grid>
		</Window>
	);
}
