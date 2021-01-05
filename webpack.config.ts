// import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";
import {
	tsLoaderRule,
	svelteLoaderRule,
	scssLoaderRule,
	scssModulesLoaderRule,
	mjsSapperFixLoaderRule,
	fileLoaderRule,
} from "./build/module/rules";
import type { BaseEnv } from "./build/types";
import type { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyPlugin from "copy-webpack-plugin";
import { tsConfigPathPlugin } from "./build/resolve/plugins";

const alias = {
	svelte: path.resolve("node_modules", "svelte"),
	src: path.resolve("src"),
};
const extensions = [".ts", ".mjs", ".js", ".svelte"];
const mainFields = ["svelte", "browser", "module", "main"];

export default function config(env: BaseEnv): Configuration {
	const plugins = [];
	const rules = [];

	if (!env.sapper) {
		plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: "public",
						to: ".",
					},
				],
			})
		);
	}

	if (env.server) {
		rules.push(scssModulesLoaderRule({ env }));
	}

	if (env.sapper) {
		rules.push(mjsSapperFixLoaderRule());
	}

	if (env.analyzeBundle) {
		plugins.push(new BundleAnalyzerPlugin());
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
				svelteLoaderRule({ env, ssr: env.server }),
				scssLoaderRule({ env }),
				fileLoaderRule(),
				...rules,
			],
		},
		mode: env.production ? "production" : "development",
		plugins: [
			new CleanWebpackPlugin(),
			...plugins,
			// TODO: MiniCssExtractPlugin
			// new MiniCssExtractPlugin({
			// 	filename: "[name].css",
			// }),
		],
		devtool: env.production ? false : "source-map",
	};
}
