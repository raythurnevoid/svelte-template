import type { RuleSetRule } from "webpack";
import type { BaseInput } from "../../types";

export function mjsLoaderRule(): RuleSetRule {
	return {
		test: /\.m?js/,
		resolve: {
			fullySpecified: false,
		},
	};
}

interface SvelteMjsLoaderRuleInput extends BaseInput {}
