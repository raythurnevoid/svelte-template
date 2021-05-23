import path from "path";
import {
	tsLoaderRule,
	svelteLoaderRule,
	scssLoaderRule,
	scssModulesLoaderRule,
	fileLoaderRule,
} from "../module/rules";
import {
	bundleAnalyzerPlugin,
	cleanWebpackPlugin,
	copyPlugin,
	cssExtractPlugin,
	cssMinimizerPlugin,
	progressPlugin,
} from "../plugins";
import type { BaseInput } from "../types";
import type { Configuration, WebpackPluginInstance } from "webpack";
import { tsConfigPathPlugin } from "../resolve/plugins";

const alias = {
	svelte: path.resolve("node_modules", "svelte"),
	src: path.resolve("src"),
};
const extensions = [".ts", ".mjs", ".js", ".svelte"];

export function createConfig(
	input: SvelteTempalteConfigurationInput
): Configuration {
	const { env } = input;

	let mainFields = ["svelte", "browser", "module", "main"];
	if (env.server) {
		mainFields = ["svelte", "module", "main"];
	}

	const plugins: WebpackPluginInstance[] = [];
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
				...svelteLoaderRule({ env, emitCss: input.extractCss }),
				scssLoaderRule({ env, extract: input.extractCss }),
				scssModulesLoaderRule({ env, extract: input.extractCss }),
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

export interface SvelteTempalteConfigurationInput extends BaseInput {
	extractCss?: boolean;
}
