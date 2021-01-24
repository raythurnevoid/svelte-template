import type { BaseInput } from "../../types";

export function mjsLoaderRule() {
	return {
		test: /\.m?js/,
		resolve: {
			fullySpecified: false,
		},
	};
}

interface SvelteMjsLoaderRuleInput extends BaseInput {}
