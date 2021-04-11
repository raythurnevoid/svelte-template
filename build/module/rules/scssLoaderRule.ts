import type { BaseInput } from "../../types";
import { cssLoader, scssLoader } from "./loaders";
import type { CssLoaderInput } from "./loaders";
import type { RuleSetRule } from "webpack";

export function scssLoaderRule(input: ScssLoaderRuleInput): RuleSetRule {
	return {
		test: /\.s?css$/,
		exclude: /module\.s?css$/,
		use: [
			//"@teamsupercell/typings-for-css-modules-loader", issues with sapper ...
			...cssLoader({ ...input }),
			scssLoader(input),
		],
	};
}

export interface ScssLoaderRuleInput
	extends BaseInput,
		Pick<CssLoaderInput, "extract"> {}
