import { doesExists } from "./file.js";
import { cwd } from "process";
import { resolve } from "path";

export async function getSvelteConfigPath(path?: string) {
	const extensions = ["mjs", "cjs", "js"] as const;

	let resolved: string;

	if (path) {
		resolved = resolve(path);
	} else {
		for (const extension of extensions) {
			resolved = resolve(cwd(), `svelte.config.${extension}`);
			if (await doesExists(resolved)) {
				break;
			}
		}
	}

	return resolved;
}

export async function readSvelteConfig(filePath) {
	try {
		filePath ??= await getSvelteConfigPath();
		const m = await import(`file://${filePath}`);
		return m.default;
	} catch (e) {
		const error = `Error loading svelte.config file: ${filePath}.\n Caused by > ${e.stack}`;
		throw new Error(error);
	}
}
