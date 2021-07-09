import path from "path";
import type { BaseEnv } from "./build/types.js";
import createBaseConfig from "./webpack.config.js";
import type { Configuration } from "webpack";
import "webpack-dev-server";

export default async function config(env: BaseEnv): Promise<Configuration> {
	const baseConfig = await createBaseConfig(env);

	return {
		...baseConfig,
		// @ts-ignore
		devServer: {
			contentBase: path.resolve("dist"),
			writeToDisk: true,
			hot: true,
		},
	};
}
