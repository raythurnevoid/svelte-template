import type { BaseInput } from "../../types";

export function svelteMjsLoaderRule() {
	return {
		test: /node_modules\/svelte\/.*\.mjs$/,
		resolve: {
			fullySpecified: false,
		},
	};
}

interface SvelteMjsLoaderRuleInput extends BaseInput {}
