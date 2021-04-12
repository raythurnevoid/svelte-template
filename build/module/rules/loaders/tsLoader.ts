import type { Options } from "ts-loader";
import { getTsConfigPath, readTsConfig } from "../../../utils/readTsConfig";

export function tsLoader(input: TsLoaderInput) {
	return {
		loader: "ts-loader",
		options: {
			allowTsInNodeModules: true,
			configFile: input.tsConfigPath ?? getTsConfigPath(),
			// compilerOptions: {
			// 	...readTsConfig(input.tsConfigPath),
			// },
		} as Options,
	};
}

export interface TsLoaderInput {
	tsConfigPath?: string;
}
