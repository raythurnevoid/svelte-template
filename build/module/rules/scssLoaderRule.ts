import type { BaseInput } from "../../types";
import { cssLoader, scssLoader } from "./loaders";

export function scssLoaderRule(input: SvelteLoaderRuleInput) {
	const loaders = [];

	if (!input.server) {
		loaders.push("style-loader");
	}

	// TODO: MiniCssExtractPlugin.loader
	return {
		test: /\.s?css$/,
		exclude: /module\.s?css$/,
		use: [...loaders, cssLoader(input), scssLoader(input)],
	};
}

interface SvelteLoaderRuleInput extends BaseInput {
	server?: boolean;
}
