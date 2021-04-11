import type { RuleSetRule } from "webpack";
import type { BaseInput } from "../../types";
import { cssLoader, scssLoader } from "./loaders";
import type { CssLoaderInput } from "./loaders";

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
