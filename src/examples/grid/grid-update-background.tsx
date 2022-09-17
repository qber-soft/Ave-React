import React, { useEffect, useState } from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridUpdateBackground() {
	const [value, setValue] = useState(Color.DanShuHong);

	useEffect(() => {
		setTimeout(() => {
			console.log(`update value`);
			setValue(Color.DarkBlue);
		}, 1000);
	}, []);

	return (
		<Window title="Grid Update Background">
			<Grid style={{ backgroundColor: value }}></Grid>
		</Window>
	);
}
