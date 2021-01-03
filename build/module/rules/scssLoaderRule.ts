import type { BaseInput } from "../../types";
import { cssLoader, scssLoader } from "./loaders";

export function scssLoaderRule(input: SvelteLoaderRuleInput) {
	// TODO: MiniCssExtractPlugin.loader
	return {
		test: /\.s?css$/,
		exclude: /module\.s?css$/,
		use: ["style-loader", cssLoader(input), scssLoader(input)],
	};
}

interface SvelteLoaderRuleInput extends BaseInput {}
