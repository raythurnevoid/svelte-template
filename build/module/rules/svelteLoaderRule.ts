import type { RuleSetRule } from "webpack";
import type { BaseInput } from "../../types.js";
import type { SvelteLoaderInput } from "./loaders/index.js";
import { svelteLoader } from "./loaders/index.js";
import { babelLoader, TsLoaderInput } from "./loaders/index.js";
import { mjsLoaderRule } from "./mjsLoaderRule.js";

export async function svelteLoaderRule(input: SvelteLoaderRuleInput) {
	const use = [];

	if (input.babel) use.push(babelLoader(input));

	const svelteLoaderRule = {
		test: /\.(svelte)$/,
		use: [...use, await svelteLoader(input)],
	} as RuleSetRule;

	return [svelteLoaderRule, mjsLoaderRule()];
}

interface SvelteLoaderRuleInput
	extends BaseInput,
		TsLoaderInput,
		SvelteLoaderInput {}
