import React, { useEffect, useState } from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridUpdateBackground3() {
	const [value, setValue] = useState(Color.DanShuHong);

	useEffect(() => {
		setTimeout(() => {
			console.log(`update value`);
			setValue(null);
		}, 3000);
	}, []);

	return (
		<Window title="Grid Update Background 3">
			<Grid style={{ backgroundColor: value }}></Grid>
		</Window>
	);
}
