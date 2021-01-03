import svelteConfig from "../../../svelte.config";
import type { BaseInput } from "../../types";
import { babelLoader } from "./loaders";

export function svelteLoaderRule(input: SvelteLoaderRuleInput) {
	const use = [];

	if (input.babel) use.push(babelLoader(input));

	return {
		test: /\.(svelte)$/,
		use: [
			...use,
			{
				loader: "svelte-loader",
				options: {
					...svelteConfig,
					dev: !input.env.production,
					css: !input.ssr,
					hydratable: !input.ssr,
					hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
					generate: input.ssr ? "ssr" : undefined,
					//emitCss: ssr, waiting: https://github.com/sveltejs/svelte-loader/pull/136
				},
			},
		],
	};
}

interface SvelteLoaderRuleInput extends BaseInput {
	ssr?: boolean;
	babel?: boolean;
}
