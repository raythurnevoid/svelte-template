import { readConfigFile, sys } from "typescript";
import type { CompilerOptions } from "typescript";
import { resolve } from "path";
import { openSync } from "fs";

export function readTsConfig() {
	const stack: Stack[] = [];
	const basePath = resolve(".");

	let nextFilePath = "tsconfig.json";

	while (true) {
		let filePath = resolve(basePath, nextFilePath);

		if (isInStack(stack, filePath)) {
			const error = `Circular dependency: ${getStackPaths(
				stack
			)} -> ${filePath}`;
			console.error(error);
			throw new Error(error);
		}

		if (!exists(filePath)) {
			let nodeModulesFilePath = resolve(basePath, "node_modules", nextFilePath);
			if (!exists(nodeModulesFilePath)) {
				const error = `File not found: ${filePath} | ${nodeModulesFilePath}`;
				console.error(error);
				throw new Error(error);
			}
			filePath = nodeModulesFilePath;
		}

		const { config } = readConfigFile(filePath, sys.readFile);

		stack.push({
			path: filePath,
			compilerOptions: config.compilerOptions,
		});

		if (config.extends) {
			nextFilePath = config.extends;
			continue;
		}

		break;
	}

	const result = stack.reverse().reduce((compilerOptions, stack) => {
		return { ...compilerOptions, ...stack.compilerOptions };
	}, {} as CompilerOptions);

	return result;
}

function exists(file: string) {
	try {
		openSync(file, "r");
	} catch (err) {
		return false;
	}

	return true;
}

function isInStack(stack: Stack[], path: string) {
	return stack.some((stack) => stack.path === path);
}

function getStackPaths(stack: Stack[]) {
	stack.map((stack) => stack.path);
}

interface Stack {
	path: string;
	compilerOptions: CompilerOptions;
}
