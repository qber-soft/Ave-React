import { ResourceSource, ThemeFileImage } from "ave-ui";
import React, { useCallback, useState } from "react";
import { Window, Button, getAppContext } from "../../ave-react";
import { DemoLayout } from "../common";
import path from "path";
import fs from "fs";

export function TestThemeGeek() {
	const [isGeek, setIsGeek] = useState(false);
	const switchTheme = useCallback(() => setIsGeek(onSwitchTheme), []);

	return (
		<Window title="Theme Geek">
			<DemoLayout>
				<Button text="Switch Theme" onClick={switchTheme}></Button>
			</DemoLayout>
		</Window>
	);
}

function onSwitchTheme(prevTheme: boolean) {
	const isGeekTheme = !prevTheme;
	console.log(`switch theme geek: ${prevTheme} -> ${isGeekTheme}`);
	const context = getAppContext();
	const themeImage = context.getThemeImage();
	if (isGeekTheme) {
		const themePath = path.resolve(__dirname, "../assets/HyperEmerald.ave-theme-image");
		const themeBuffer = fs.readFileSync(themePath);
		const themeGeek = new ThemeFileImage();
		if (themeGeek.Open(ResourceSource.FromBuffer(themeBuffer))) {
			themeGeek.SetTheme(themeImage, 0);
		} else {
			console.log("open image file failed");
		}
	} else {
		themeImage.ResetTheme();
	}
	return isGeekTheme;
}
