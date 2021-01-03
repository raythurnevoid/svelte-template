import type { Options } from "ts-loader";

export function tsLoader() {
	return {
		loader: "ts-loader",
		options: {
			allowTsInNodeModules: true,
		} as Options,
	};
}
