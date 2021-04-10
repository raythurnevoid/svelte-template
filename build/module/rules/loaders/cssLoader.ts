import type { BaseInput } from "../../../types";

export function cssLoader(input: CssLoaderInput) {
	let modules: any;
	if (input.modules) {
		modules = {
			localIdentName: "[local]--[hash:base64:5]",
		};

		if (input.server) {
			modules.exportOnlyLocals = true;
		}
	}

	return {
		loader: "css-loader",
		options: {
			modules,
			esModule: input.modules,
			sourceMap: !input.env.production,
		},
	};
}

interface CssLoaderInput extends BaseInput {
	modules?: boolean;
	server?: boolean;
}
