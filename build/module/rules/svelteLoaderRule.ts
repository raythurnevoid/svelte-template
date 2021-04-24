import { preprocessConfig } from "../../../svelte.config";
import type { BaseInput } from "../../types";
import { babelLoader, TsLoaderInput } from "./loaders";
import sveltePreprocess from "svelte-preprocess";
import { getTsConfigPath } from "../../utils/readTsConfig";
import { mjsLoaderRule } from "./mjsLoaderRule";

export function svelteLoaderRule(input: SvelteLoaderRuleInput) {
	const use = [];

	if (input.babel) use.push(babelLoader(input));

	return [
		{
			test: /\.(svelte)$/,
			use: [
				...use,
				{
					loader: "svelte-loader",
					options: {
						preprocess: {
							...sveltePreprocess({
								...preprocessConfig,
								typescript: {
									...preprocessConfig.typescript,
									tsconfigFile: input.tsConfigPath ?? getTsConfigPath(),
									// compilerOptions: {
									// 	...readTsConfig(input.tsConfigPath),
									// } as CompilerOptions,
									stripIndent: !input.env.production,
								},
							}),
						},
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
		},
		mjsLoaderRule(),
	];
}

interface SvelteLoaderRuleInput extends BaseInput, TsLoaderInput {
	ssr?: boolean;
	babel?: boolean;
	emitCss?: boolean;
}
