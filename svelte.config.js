/** @type {import('svelte-preprocess')["default"]} */
const sveltePreprocess = require("svelte-preprocess");
const path = require("path");

module.exports = {
	preprocess: sveltePreprocess({
		typescript: true,
		scss: {
			includePaths: [path.resolve("node_modules")],
		},
	}),
};
