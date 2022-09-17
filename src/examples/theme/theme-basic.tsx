import { ThemePredefined_Dark } from "ave-ui";
import React, { useCallback, useState } from "react";
import { Window, Button, getAppContext } from "../../ave-react";
import { DemoLayout } from "../common";

export function TestThemeBasic() {
	const [isDark, setIsDark] = useState(false);
	const switchTheme = useCallback(() => setIsDark(onSwitchTheme), []);

	return (
		<Window title="Theme Basic">
			<DemoLayout>
				<Button text="Switch Theme" onClick={switchTheme}></Button>
			</DemoLayout>
		</Window>
	);
}

function onSwitchTheme(prevTheme: boolean) {
	const isDarkTheme = !prevTheme;
	console.log(`switch theme isDark: ${prevTheme} -> ${isDarkTheme}`);
	const context = getAppContext();
	const themeImage = context.getThemeImage();
	if (isDarkTheme) {
		const themeDark = new ThemePredefined_Dark();
		themeDark.SetStyle(themeImage, 0);
	} else {
		themeImage.ResetTheme();
	}
	return isDarkTheme;
}
