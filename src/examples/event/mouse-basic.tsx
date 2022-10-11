import { MessagePointer, Vec2 } from "ave-ui";
import React, { useRef, useState } from "react";
import { Window, Button, IButtonComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

function formatMessagePointer(mp: MessagePointer) {
	return `pos: (${mp.Position.x}, ${mp.Position.y})`;
}

export function TestMouseBasic() {
	const [text, setText] = useState("out");
	const refEntered = useRef(false);
	const refPos = useRef(new Vec2(0, 0));

	const updateButton = () => {
		setText(`${refEntered.current ? `at ${refPos.current.x}, ${refPos.current.y}` : "out"}`);
	};

	const onPointerEnter: IButtonComponentProps["onPointerEnter"] = () => {
		refEntered.current = true;
		updateButton();
	};

	const onPointerLeave: IButtonComponentProps["onPointerLeave"] = () => {
		refEntered.current = false;
		updateButton();
	};

	const onPointerMove: IButtonComponentProps["onPointerMove"] = (sender, mp) => {
		refPos.current = mp.Position;
		updateButton();
	};

	const onPointerHover: IButtonComponentProps["onPointerHover"] = (sender, mp) => {
		console.log("on hover");
	};

	const onPointerPress: IButtonComponentProps["onPointerPress"] = (sender, mp) => {
		console.log(`on press: ${formatMessagePointer(mp)}`);
	};

	const onPointerRelease: IButtonComponentProps["onPointerRelease"] = (sender, mp) => {
		console.log(`on release: ${formatMessagePointer(mp)}`);
	};

	return (
		<Window>
			<DemoLayout>
				<Button text={text} onPointerRelease={onPointerRelease} onPointerPress={onPointerPress} onPointerHover={onPointerHover} onPointerMove={onPointerMove} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}></Button>
			</DemoLayout>
		</Window>
	);
}
