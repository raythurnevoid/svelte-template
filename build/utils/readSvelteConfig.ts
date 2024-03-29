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

export async function readSvelteConfig(inputFilePath) {
	try {
		const filePath = inputFilePath ?? (await getSvelteConfigPath());
		let m: any;
		if (typeof module === "undefined") {
			m = await import(`file://${filePath}`);
		} else {
			m = await import(filePath);
		}
		return m.default;
	} catch (e) {
		if (inputFilePath) {
			const error = `Error loading svelte.config file: ${inputFilePath}.\n Caused by > ${e.stack}`;
			throw new Error(error);
		} else {
			return {};
		}
	}
}
