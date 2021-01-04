// import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";
import {
	tsLoaderRule,
	svelteLoaderRule,
	scssLoaderRule,
	scssModulesLoaderRule,
} from "./build/module/rules";
import type { BaseEnv } from "./build/types";
import type { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyPlugin from "copy-webpack-plugin";

const alias = {
	svelte: path.resolve("node_modules", "svelte"),
	src: path.resolve("src"),
};
const extensions = [".ts", ".mjs", ".js", ".svelte"];
const mainFields = ["svelte", "browser", "module", "main"];

export default function config(env: BaseEnv): Configuration {
	const plugins = [];

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
		target: "web",
		resolve: {
			alias,
			extensions,
			mainFields,
		},
		module: {
			rules: [
				tsLoaderRule({ env }),
				svelteLoaderRule({ env }),
				scssLoaderRule({ env }),
				scssModulesLoaderRule({ env }),
			],
		},
		mode: env.production ? "production" : "development",
		plugins: [
			new CleanWebpackPlugin(),
			new CopyPlugin({
				patterns: [
					{
						from: "public",
						to: ".",
					},
				],
			}),
			...plugins,
			// TODO: MiniCssExtractPlugin
			// new MiniCssExtractPlugin({
			// 	filename: "[name].css",
			// }),
		],
		devtool: env.production ? false : "source-map",
	};
}
