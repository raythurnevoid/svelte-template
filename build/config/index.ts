// import MiniCssExtractPlugin from "mini-css-extract-plugin";
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
import type { BaseEnv } from "../types";
import type { Configuration } from "webpack";
import { tsConfigPathPlugin } from "../resolve/plugins";

const alias = {
	svelte: path.resolve("node_modules", "svelte"),
	src: path.resolve("src"),
};
const extensions = [".ts", ".mjs", ".js", ".svelte"];
const mainFields = ["svelte", "browser", "module", "main"];

export function createConfig(env: BaseEnv): Configuration {
	const plugins = [];

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
				scssLoaderRule({ env }),
				scssModulesLoaderRule({ env }),
				fileLoaderRule(),
			],
		},
		mode: env.production ? "production" : "development",
		plugins: [
			cleanWebpackPlugin(),
			copyPlugin(),
			...plugins,
			// TODO: MiniCssExtractPlugin
			// new MiniCssExtractPlugin({
			// 	filename: "[name].css",
			// }),
		],
		devtool: env.production ? false : "source-map",
	};
}
