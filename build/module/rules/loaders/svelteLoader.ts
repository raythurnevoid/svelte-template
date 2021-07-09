import type { RuleSetRule } from "webpack";
import type { BaseInput } from "../../../types.js";
import { babelLoader, TsLoaderInput } from "./index.js";
import { readSvelteConfig } from "../../../utils/readSvelteConfig.js";
import type { AutoPreprocessOptions } from "svelte-preprocess/dist/types";

export async function svelteLoader(input: SvelteLoaderInput) {
	const use = [];

	if (input.babel) use.push(babelLoader(input));

	const svelteConfig = await readSvelteConfig(input.svelteConfigPath);

	const svelteLoader = {
		loader: "svelte-loader",
		options: {
			...svelteConfig,
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
	} as RuleSetRule;

	return svelteLoader;
}

export interface SvelteLoaderInput extends BaseInput, TsLoaderInput {
	svelteConfigPath?: string;
	ssr?: boolean;
	babel?: boolean;
	emitCss?: boolean;
	autoPreprocessConfig?: AutoPreprocessOptions;
	target?: "ES6" | "ES2019";
}
