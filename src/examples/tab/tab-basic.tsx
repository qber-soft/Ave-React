import React from "react";
import { Window, Tab } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestTabBasic() {
	return (
		<Window title="Tab Basic">
			<DemoLayout width="300dpx" height="150dpx">
				<Tab
					items={[
						{ id: 1, name: "tab1" },
						{ id: 2, name: "tab2" },
					]}
				></Tab>
			</DemoLayout>
		</Window>
	);
}
