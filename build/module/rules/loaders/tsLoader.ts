import type { Options } from "ts-loader";
import { getTsConfigPath } from "../../../utils/readTsConfig.js";

export function tsLoader(input: TsLoaderInput) {
	return {
		loader: "ts-loader",
		options: {
			allowTsInNodeModules: true,
			configFile: input.tsConfigPath ?? getTsConfigPath(),
			transpileOnly: true,
		} as Options,
	};
}

export interface TsLoaderInput {
	tsConfigPath?: string;
}
