import type { RuleSetRule } from "webpack";
import sveltePreprocess from "svelte-preprocess";
import type { BaseInput } from "../../../types.js";
import { babelLoader, TsLoaderInput } from "./index.js";
import { getTsConfigPath } from "../../../utils/readTsConfig.js";
import {
	readSvelteConfig,
	getSvelteConfigPath,
} from "../../../utils/readSvelteConfig.js";
import type { AutoPreprocessOptions } from "svelte-preprocess/dist/types";

export async function getAutoPreprocessConfig(input: SvelteLoaderInput) {
	const svelteConfigPath = await getSvelteConfigPath(input.svelteConfigPath);

	const { autoPreprocessConfig } = await import(`file://${svelteConfigPath}`);

	const config = {
		...(autoPreprocessConfig ?? {}),
		...(input.autoPreprocessConfig ?? {}),
	};

	return {
		...config,
		typescript: {
			...(config.typescript ?? {}),
			tsconfigFile: input.tsConfigPath ?? getTsConfigPath(),
			compilerOptions: {
				...(config.typescript.compilerOptions ?? {}),
				target: input.target ?? "ES2019",
			},
			//? stripIndent: !input.env.production, needed?
		},
	};
}

export async function svelteLoader(input: SvelteLoaderInput) {
	const use = [];

	if (input.babel) use.push(babelLoader(input));

	const svelteConfig = await readSvelteConfig(input.svelteConfigPath);

	const svelteLoader = {
		loader: "svelte-loader",
		options: {
			...svelteConfig,
			preprocess: sveltePreprocess(getAutoPreprocessConfig(input)),
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
