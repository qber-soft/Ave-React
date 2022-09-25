import React from "react";
import { AveRenderer } from "./ave-react";
import { startDevtoolBackend } from "./devtool";
import { TestKeyboardBasic } from "./examples";

if (process.env.NODE_ENV === "dev") {
	startDevtoolBackend();
}

const app = <TestKeyboardBasic />;

AveRenderer.render(app);
