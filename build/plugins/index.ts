import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

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
