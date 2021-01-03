import type { BaseInput } from "../../types";
import { babelLoader, tsLoader } from "./loaders";

export function tsLoaderRule(input: TsLoaderRuleInput) {
	const use = [];

	if (input.babel) use.push(babelLoader(input));

	return {
		test: /\.ts$/,
		use: [...use, tsLoader()],
	};
}

interface TsLoaderRuleInput extends BaseInput {
	babel?: boolean;
}
