/** @type {import('svelte-preprocess')["default"]} */
const sveltePreprocess = require("svelte-preprocess");
const path = require("path");

const preprocessConfig = {
	typescript: {
		tsconfigFile: path.resolve("tsconfig.json"),
	},
	scss: {
		includePaths: [path.resolve("."), path.resolve("./node_modules")],
	},
};

module.exports["preprocessConfig"] = preprocessConfig;
module.exports = {
	preprocess: sveltePreprocess(preprocessConfig),
	preprocessConfig,
};
