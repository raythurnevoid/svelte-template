import type { RuleSetRule } from "webpack";
import type { BaseInput } from "../../types.js";
import { cssLoader, scssLoader } from "./loaders/index.js";
import type { CssLoaderInput } from "./loaders/index.js";

export function scssModulesLoaderRule(
	input: ScssModulesLoaderRuleInput
): RuleSetRule {
	return {
		test: /module\.s?css$/,
		use: [
			//"@teamsupercell/typings-for-css-modules-loader", issues with sapper ...
			...cssLoader({ ...input, modules: true }),
			scssLoader(input),
		],
	};
}

export interface ScssModulesLoaderRuleInput
	extends BaseInput,
		Pick<CssLoaderInput, "extract"> {}
