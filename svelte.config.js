/** @type {import('svelte-preprocess')["default"]} */
const sveltePreprocess = require("svelte-preprocess");
const path = require("path");

module.exports = {
	preprocess: sveltePreprocess({
		typescript: {
			tsconfigFile: path.resolve("tsconfig.json"),
		},
		scss: {
			includePaths: [path.resolve("."), path.resolve("./node_modules")],
		},
	}),
};
