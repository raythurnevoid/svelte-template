import type { BaseInput } from "../../../build/types";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import path from "path";

export function tsConfigPathPlugin() {
	// Clear TS_NODE_PROJECT env var to prevent conflict with initial tsconfig file used to load ts-node
	delete process.env.TS_NODE_PROJECT;

	return new TsconfigPathsPlugin({
		configFile: path.resolve(process.cwd(), "tsconfig.json"),
	}) as any;
}

interface TsConfigPathPluginInput extends BaseInput {}
