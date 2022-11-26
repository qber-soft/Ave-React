import React from "react";
import { AveRenderer } from "./ave-react";
import { startDevtoolBackend } from "./devtool";
import { TestGridUpdateLayout } from "./examples";

if (process.env.NODE_ENV === "dev") {
	startDevtoolBackend();
}

const app = <TestGridUpdateLayout />;

AveRenderer.render(app);
