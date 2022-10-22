import React from "react";
import { Window, TrackBar } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestTrackBarBasic() {
	return (
		<Window title="TrackBar Basic">
			<DemoLayout width="500dpx" height="25dpx">
				<TrackBar
					onThumbRelease={(sender) => {
						console.log(`on thumb release, current value: ${sender.GetValue()}`);
					}}
				></TrackBar>
			</DemoLayout>
		</Window>
	);
}
