import path from "path";
import {
	tsLoaderRule,
	svelteLoaderRule,
	scssLoaderRule,
	scssModulesLoaderRule,
	fileLoaderRule,
} from "../module/rules/index.js";
import {
	bundleAnalyzerPlugin,
	cleanWebpackPlugin,
	copyPlugin,
	cssExtractPlugin,
	cssMinimizerPlugin,
	progressPlugin,
	tsCheckPlugin,
} from "../plugins/index.js";
import type { BaseInput } from "../types.js";
import type { Configuration, WebpackPluginInstance } from "webpack";
import { tsConfigPathPlugin } from "../resolve/plugins/index.js";
import type { AutoPreprocessOptions } from "svelte-preprocess/dist/types";

const alias = {
	svelte: path.resolve("node_modules", "svelte"),
	src: path.resolve("src"),
};
const extensions = [".ts", ".mjs", ".js", ".svelte"];

export async function createConfig(
	input: SvelteTemplateConfigurationInput
): Promise<Configuration> {
	const { env } = input;

	let mainFields = ["svelte", "browser", "module", "main"];
	if (env.server) {
		mainFields = ["svelte", "module", "main"];
	}

	const plugins: WebpackPluginInstance[] = [tsCheckPlugin({})];
	if (!env.server) {
		plugins.push(cleanWebpackPlugin());
		plugins.push(copyPlugin());

		if (input.extractCss) {
			plugins.push(cssExtractPlugin());
		}
	}
	if (env.analyzeBundle) {
		plugins.push(bundleAnalyzerPlugin());
	}
	if (env.fancyProgress) {
		plugins.push(progressPlugin());
	}

	const minimizers: WebpackPluginInstance[] = [];
	if (input.env.production) {
		minimizers.push("..." as any);
		minimizers.push(cssMinimizerPlugin());
	}

	const conf: Configuration = {
		entry: {
			app: ["./src/main.ts"],
		},
		output: {
			path: path.resolve("dist"),
			filename: "[name].js",
			chunkFilename: "[name].[id].js",
		},
		target: env.server ? "node" : "web",
		resolve: {
			alias,
			extensions,
			mainFields,
			plugins: [tsConfigPathPlugin()],
		},
		module: {
			rules: [
				tsLoaderRule({ env }),
				...(await svelteLoaderRule({
					env,
					emitCss: input.extractCss,
					autoPreprocessConfig: input.svelteAutoPreprocessConfig,
					svelteConfigPath: input.svelteConfigPath,
				})),
				scssLoaderRule({
					env,
					extract: input.extractCss,
					includePaths: input.includePathsCss,
				}),
				scssModulesLoaderRule({
					env,
					extract: input.extractCss,
					includePaths: input.includePathsCss,
				}),
				fileLoaderRule(),
			],
		},
		mode: env.production ? "production" : "development",
		optimization: {
			minimizer: minimizers,
		},
		plugins: plugins,
		devtool: env.production ? false : "source-map",
	};

	return conf;
}

export interface SvelteTemplateConfigurationInput extends BaseInput {
	includePathsCss?: string[];
	extractCss?: boolean;
	svelteAutoPreprocessConfig?: AutoPreprocessOptions;
	svelteConfigPath?: string;
}
