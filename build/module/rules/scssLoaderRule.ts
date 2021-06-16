import type { BaseInput } from "../../types.js";
import { cssLoader, scssLoader } from "./loaders/index.js";
import type { CssLoaderInput } from "./loaders/index.js";
import type { RuleSetRule } from "webpack";

export function scssLoaderRule(input: ScssLoaderRuleInput): RuleSetRule {
	return {
		test: /\.s?css$/,
		exclude: /module\.s?css$/,
		use: [
			//"@teamsupercell/typings-for-css-modules-loader", issues with sapper ...
			...cssLoader(input),
			scssLoader(input),
		],
	};
}

export interface ScssLoaderRuleInput
	extends BaseInput,
		Pick<CssLoaderInput, "extract"> {}
