import type { Options } from "ts-loader";
import { readTsConfig } from "../../../utils/readTsConfig";

export function tsLoader() {
	return {
		loader: "ts-loader",
		options: {
			allowTsInNodeModules: true,
			compilerOptions: {
				...readTsConfig(),
			},
		} as Options,
	};
}
