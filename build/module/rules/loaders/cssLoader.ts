import type { BaseInput } from "../../../types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { RuleSetUseItem } from "webpack";

export function cssLoader(input: CssLoaderInput): RuleSetUseItem[] {
	let loaders: RuleSetUseItem[] = [];
	if (!input.env.server) {
		if (input.extract) {
			loaders.push(MiniCssExtractPlugin.loader);
		} else {
			loaders.push({
				loader: "style-loader",
			});
		}
	}

	let modules: any;
	if (input.modules) {
		modules = {
			localIdentName: "[local]--[hash:base64:5]",
		};

		if (input.env.server) {
			modules.exportOnlyLocals = true;
		}
	}

	return [
		...loaders,
		{
			loader: "css-loader",
			options: {
				modules,
				esModule: input.modules,
				sourceMap: !input.env.production,
			},
		},
	];
}

export interface CssLoaderInput extends BaseInput {
	modules?: boolean;
	extract?: boolean;
}
