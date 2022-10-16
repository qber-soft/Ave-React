import React from "react";
import { AveRenderer } from "./ave-react";
import { startDevtoolBackend } from "./devtool";
import { TestCheckBoxBasic } from "./examples";

if (process.env.NODE_ENV === "dev") {
	startDevtoolBackend();
}

const app = <TestCheckBoxBasic />;

AveRenderer.render(app);
