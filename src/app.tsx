import React from "react";
import { AveRenderer } from "./ave-react";
import { startDevtoolBackend } from "./devtool";
import { TestGridUpdateArea2 } from "./examples";

if (process.env.NODE_ENV === "dev") {
	startDevtoolBackend();
}

const app = <TestGridUpdateArea2 />;

AveRenderer.render(app);
