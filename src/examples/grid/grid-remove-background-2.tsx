import React, { useEffect, useState } from "react";
import { Grid, Window } from "../../ave-react";
import { Color } from "../common";

export function TestGridRemoveBackground2() {
	const [value, setValue] = useState<any>({ backgroundColor: Color.DanShuHong });

	useEffect(() => {
		setTimeout(() => {
			console.log(`update value`);
			setValue({});
		}, 3000);
	}, []);

	return (
		<Window title="Grid Remove Background 2">
			<Grid style={value}></Grid>
		</Window>
	);
}
