import React, { useEffect, useState } from "react";
import { Window } from "../../ave-react";

export function TestWindowUpdateTitle() {
	const [title, setTitle] = useState("Test Title");
	useEffect(() => {
		setInterval(() => {
			setTitle(`Test Title: ${new Date().toLocaleString()}`);
		}, 1000);
	}, []);

	return <Window title={title} />;
}
