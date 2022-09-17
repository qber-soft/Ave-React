import React, { useEffect, useState } from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridUpdateBackground2() {
	const [value, setValue] = useState(null);

	useEffect(() => {
		setTimeout(() => {
			console.log(`update value`);
			setValue(Color.DanShuHong);
		}, 3000);
	}, []);

	return (
		<Window title="Grid Update Background 2">
			<Grid style={{ backgroundColor: value }}></Grid>
		</Window>
	);
}
