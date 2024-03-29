import type { BaseInput } from "../../../types";
import path from "path";

export function scssLoader(input: ScssLoaderInput) {
	return {
		loader: "sass-loader",
		options: {
			sassOptions: {
				includePaths: input.includePaths ?? [
					path.resolve("../../../.."),
					path.resolve("../../../../node_modules"),
				],
			},
			sourceMap: !input.env.production,
		},
	};
}

export interface ScssLoaderInput extends BaseInput {
	includePaths?: string[];
}
