import React, { useEffect, useState } from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridUpdateMargin() {
	const [margin, setMargin] = useState("50dpx 50dpx 100dpx 100dpx");

	useEffect(() => {
		setTimeout(() => {
			console.log(`update margin`);
			setMargin("100dpx 0dpx 50dpx 50dpx");
		}, 2000);
	}, []);
	return (
		<Window title="Grid Update Margin">
			<Grid>
				<Grid style={{ backgroundColor: Color.DanShuHong, margin }}></Grid>
			</Grid>
		</Window>
	);
}
