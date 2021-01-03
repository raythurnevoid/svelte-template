import type { BaseInput } from "../../types";
import { cssLoader, scssLoader } from "./loaders";

export function scssModulesLoaderRule(input: SvelteLoaderRuleInput) {
	// TODO: MiniCssExtractPlugin.loader
	return {
		test: /module\.s?css$/,
		use: [
			"style-loader",
			//"@teamsupercell/typings-for-css-modules-loader", issues with sapper ...
			cssLoader({ ...input, modules: true }),
			scssLoader(input),
		],
	};
}

interface SvelteLoaderRuleInput extends BaseInput {
	ssr?: boolean;
}
