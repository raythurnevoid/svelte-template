import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import WebpackBarPlugin from "webpackbar";

export function bundleAnalyzerPlugin() {
	return new BundleAnalyzerPlugin();
}

export function cleanWebpackPlugin() {
	return new CleanWebpackPlugin();
}

export function copyPlugin() {
	return new CopyPlugin({
		patterns: [
			{
				from: "public",
				to: ".",
			},
		],
	});
}

export function cssExtractPlugin() {
	return new MiniCssExtractPlugin({
		filename: "[name].css",
	});
}

export function cssMinimizerPlugin() {
	return new CssMinimizerPlugin();
}

export function progressPlugin() {
	return new WebpackBarPlugin({
		reporters: ["fancy", "profile"],
	});
}
