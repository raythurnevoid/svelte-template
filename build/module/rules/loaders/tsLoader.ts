import type { Options } from "ts-loader";
import { readTsConfig } from "../../../utils/readTsConfig";

export function tsLoader(input: TsLoaderInput) {
	return {
		loader: "ts-loader",
		options: {
			allowTsInNodeModules: true,
			compilerOptions: {
				...readTsConfig(input.tsConfigPath),
			},
		} as Options,
	};
}

export interface TsLoaderInput {
	tsConfigPath?: string;
}
