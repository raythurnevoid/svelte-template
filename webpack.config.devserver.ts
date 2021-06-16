import path from "path";
import type { BaseEnv } from "./build/types.js";
import createBaseConfig from "./webpack.config.js";
import type { Configuration } from "webpack";
import "webpack-dev-server";

export default function config(env: BaseEnv): Configuration {
	const baseConfig = createBaseConfig(env);

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
