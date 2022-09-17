import React, { useEffect, useState } from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridRemoveBackground() {
	const [value, setValue] = useState({ backgroundColor: Color.DanShuHong });

	useEffect(() => {
		setTimeout(() => {
			console.log(`update value`);
			setValue(null);
		}, 3000);
	}, []);

	return (
		<Window title="Grid Remove Background">
			<Grid style={value}></Grid>
		</Window>
	);
}
