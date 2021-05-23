import type { RuleSetRule } from "webpack";
import type { BaseInput } from "../../types";
import { babelLoader, tsLoader, TsLoaderInput } from "./loaders";

export function tsLoaderRule(input: TsLoaderRuleInput): RuleSetRule {
	const use = [];

	if (input.babel) use.push(babelLoader(input));

	return {
		test: /\.ts$/,
		use: [...use, tsLoader(input)],
	};
}

interface TsLoaderRuleInput extends BaseInput, TsLoaderInput {
	babel?: boolean;
}
