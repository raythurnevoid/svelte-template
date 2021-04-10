import MiniCssExtractPlugin from "mini-css-extract-plugin";
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
} from "../plugins";
import type { BaseInput } from "../types";
import type { Configuration, WebpackPluginInstance } from "webpack";
import { tsConfigPathPlugin } from "../resolve/plugins";

const alias = {
	svelte: path.resolve("node_modules", "svelte"),
	src: path.resolve("src"),
};
const extensions = [".ts", ".mjs", ".js", ".svelte"];
const mainFields = ["svelte", "browser", "module", "main"];

export function createConfig(
	input: SvelteTempalteConfigurationInput
): Configuration {
	const { env } = input;

	const plugins: WebpackPluginInstance[] = [];

	if (!env.server) {
		plugins.push(cleanWebpackPlugin());
		plugins.push(copyPlugin());
	}

	if (input.extractCss && !env.server) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: "[name].css",
			})
		);
	}

	if (env.analyzeBundle) {
		plugins.push(bundleAnalyzerPlugin());
	}

	return {
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
				...svelteLoaderRule({ env }),
				scssLoaderRule({ env, extract: input.extractCss }),
				scssModulesLoaderRule({ env, extract: input.extractCss }),
				fileLoaderRule(),
			],
		},
		mode: env.production ? "production" : "development",
		plugins: [...plugins],
		devtool: env.production ? false : "source-map",
	};
}

export interface SvelteTempalteConfigurationInput extends BaseInput {
	extractCss?: boolean;
}
