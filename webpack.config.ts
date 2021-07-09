// import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import type { BaseEnv } from "./build/types.js";
import type { Configuration } from "webpack";
import { createConfig } from "./build/config/index.js";

export default async function config(env: BaseEnv): Promise<Configuration> {
	if (!process.env.NODE_ENV) {
		process.env.NODE_ENV = env?.production ? "production" : "development";
	}

	console.info(JSON.stringify(env, null, 2));

	delete process.env.TS_NODE_PROJECT;

	const baseConfig = await createConfig({
		env,
		extractCss: true,
	});

	return {
		...baseConfig,
		entry: {
			app: ["./src/main.ts"],
		},
		output: {
			path: path.resolve("dist"),
			filename: "[name].js",
			chunkFilename: "[name].[id].js",
		},
	};
}
