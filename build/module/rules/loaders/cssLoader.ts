import type { BaseInput } from "../../../types";

export function cssLoader(input: CssLoaderInput) {
	return {
		loader: "css-loader",
		options: {
			modules: input.modules && {
				localIdentName: "[local]--[hash:base64:5]",
			},
			esModule: input.modules,
			sourceMap: !input.env.production,
		},
	};
}

interface CssLoaderInput extends BaseInput {
	modules?: boolean;
}
