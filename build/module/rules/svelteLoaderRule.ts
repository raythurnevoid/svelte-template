import svelteConfig from "../../../svelte.config.js";
import type { BaseInput } from "../../types";
import { babelLoader } from "./loaders";
import sveltePreprocess from "svelte-preprocess";
import { readTsConfig } from "../../utils/readTsConfig";
import type { CompilerOptions } from "typescript";
import { svelteMjsLoaderRule } from "./svelteMjsLoaderRule";

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
							...svelteConfig.preprocess,
							...sveltePreprocess({
								typescript: {
									...svelteConfig.preprocess.typescript,
									compilerOptions: {
										...readTsConfig(),
									} as CompilerOptions,
									stripIndent: false,
								},
							}),
						},
						compilerOptions: {
							dev: !input.env.production,
							css: !input.ssr,
							hydratable: !input.ssr,
							generate: input.ssr ? "ssr" : undefined,
							preserveWhitespace: !input.env.production,
						},
						//emitCss: ssr, waiting: https://github.com/sveltejs/svelte-loader/pull/136
						hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
					},
				},
			],
		},
		svelteMjsLoaderRule(),
	];
}

interface SvelteLoaderRuleInput extends BaseInput {
	ssr?: boolean;
	babel?: boolean;
}
