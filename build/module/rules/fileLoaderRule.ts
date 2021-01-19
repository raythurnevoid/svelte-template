import type { BaseInput } from "../../../build/types";

export function fileLoaderRule() {
	return {
		test: /\.(png|jpe?g|gif)$/i,
		use: ["file-loader"],
	};
}

interface FileLoaderRuleInput extends BaseInput {}
