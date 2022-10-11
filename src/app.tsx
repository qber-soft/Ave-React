import React from "react";
import { AveRenderer } from "./ave-react";
import { startDevtoolBackend } from "./devtool";
import { TestInputBasic } from "./examples";

if (process.env.NODE_ENV === "dev") {
	startDevtoolBackend();
}

const app = <TestInputBasic />;

AveRenderer.render(app);
