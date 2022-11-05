import React from "react";
import { Window, Tree, ITreeComponentProps } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestTreeBasic() {
	const nodes: ITreeComponentProps["nodes"] = [
		{
			text: "A",
			children: [
				{ text: "C", children: [{ text: "D", children: [] }] },
				{ text: "B", children: [] },
			],
		},
	];
	return (
		<Window title="Tree Basic">
			<DemoLayout width="500dpx" height="300dpx">
				<Tree
					nodes={nodes}
					onSelect={(sender, selected) => {
						console.log(`select ${selected.text}`);
					}}
				></Tree>
			</DemoLayout>
		</Window>
	);
}
