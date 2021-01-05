import type { BaseInput } from "../../types";

export function mjsSapperFixLoaderRule() {
	return {
		test: /\.m?js/,
		resolve: {
			fullySpecified: false,
		},
	};
}

interface MjsSapperFixLoaderRuleInput extends BaseInput {}
