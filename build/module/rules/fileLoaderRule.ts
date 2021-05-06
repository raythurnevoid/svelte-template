import type { BaseInput } from "../../../build/types";

export function fileLoaderRule() {
	return {
		test: /\.(png|jpe?g|gif|eot|ttf|svg|woff2?)$/i,
		use: ["file-loader"],
	};
}

interface FileLoaderRuleInput extends BaseInput {}
