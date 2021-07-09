/** @type {import('svelte-preprocess')["default"]} */
import sveltePreprocess from "svelte-preprocess";
import path from "path";

export const autoPreprocessConfig = {
	typescript: {
		tsconfigFile: path.resolve("tsconfig.json"),
	},
	scss: {
		includePaths: [path.resolve("."), path.resolve("./node_modules")],
	},
};

export default {
	preprocess: sveltePreprocess(autoPreprocessConfig),
	autoPreprocessConfig,
};
