import { KbKey } from "ave-ui";
import React, { useEffect } from "react";
import { Window, getAppContext } from "../../ave-react";

export function TestKeyboardBasic() {
	useEffect(() => {
		const context = getAppContext();
		const window = context.getWindow();

		// hk: hot key
		const hkW = window.HotkeyRegister(KbKey.W, 0);
		const hkS = window.HotkeyRegister(KbKey.S, 0);
		const hkA = window.HotkeyRegister(KbKey.A, 0);
		const hkD = window.HotkeyRegister(KbKey.D, 0);

		window.OnWindowHotkey((sender, nId, key, n) => {
			switch (nId) {
				case hkW:
					console.log("press w");
					break;
				case hkS:
					console.log("press s");
					break;
				case hkA:
					console.log("press a");
					break;
				case hkD:
					console.log("press d");
					break;
			}
		});
	}, []);

	return <Window></Window>;
}
