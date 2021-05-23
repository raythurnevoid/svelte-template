import { preprocessConfig } from "../../../svelte.config";
import type { BaseInput } from "../../types";
import { babelLoader, TsLoaderInput } from "./loaders";
import sveltePreprocess from "svelte-preprocess";
import { getTsConfigPath } from "../../utils/readTsConfig";
import { mjsLoaderRule } from "./mjsLoaderRule";
import type { RuleSetRule } from "webpack";

export function getPreprocessConfig(input: SvelteLoaderRulePreprocessInput) {
	return {
		...preprocessConfig,
		typescript: {
			...preprocessConfig.typescript,
			tsconfigFile: input.tsConfigPath ?? getTsConfigPath(),
			compilerOptions: {
				target: input.target ?? "ES2019",
			},
			stripIndent: !input.env.production,
		},
	};
}

export function svelteLoaderRule(input: SvelteLoaderRuleInput) {
	const use = [];

	if (input.babel) use.push(babelLoader(input));

	const svelteLoaderRule = {
		test: /\.(svelte)$/,
		use: [
			...use,
			{
				loader: "svelte-loader",
				options: {
					preprocess: sveltePreprocess(getPreprocessConfig(input)),
					compilerOptions: {
						dev: !input.env.production,
						css: !input.env.server && !input.emitCss,
						hydratable: input.ssr,
						generate: input.ssr && input.env.server ? "ssr" : undefined,
						preserveWhitespace: !input.env.production,
					},
					emitCss: input.emitCss,
					hotReload: !input.env.production,
				},
			},
		],
	} as RuleSetRule;

	return [svelteLoaderRule, mjsLoaderRule()];
}

interface SvelteLoaderRuleInput
	extends BaseInput,
		TsLoaderInput,
		SvelteLoaderRulePreprocessInput {
	ssr?: boolean;
	babel?: boolean;
	emitCss?: boolean;
}

interface SvelteLoaderRulePreprocessInput extends BaseInput, TsLoaderInput {
	target?: "ES6" | "ES2019";
}
