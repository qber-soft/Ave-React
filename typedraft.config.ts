import { ITypeDraftConfig } from "typedraft/dist/cli/literator";
import { Debug, Trace } from "./dsl";

export default {
	DSLs: [
		{
			name: "debug",
			dsl: () => new Debug({ merge: true, env: process.env.NODE_ENV || "dev" }),
		},
		{
			name: "trace",
			dsl: () => new Trace({ merge: true, env: process.env.NODE_ENV || "dev" }),
		},
	],
	Targets: [{ src: "draft/**/*.{ts,tsx}", dest: "src", baseDir: "draft" }],
} as ITypeDraftConfig;
