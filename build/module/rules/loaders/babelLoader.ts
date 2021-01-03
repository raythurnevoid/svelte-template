import type { BaseInput } from "../../../types";

export function babelLoader(input: BabelLoaderInput) {
	return {
		loader: "babel-loader",
		options: {
			presets: [["@babel/preset-env"]],
			sourceMaps: !input.env.production,
		},
	};
}

interface BabelLoaderInput extends BaseInput {}
