import type { CompilerOptions } from "typescript";
import { readConfigFile, sys } from "typescript";
import { resolve } from "path";

export function readTsConfig() {
	const stack: Stack[] = [];

	let nextFilePath = "./tsconfig.json";

	while (true) {
		let filePath = nextFilePath;

		if (isInStack(stack, filePath)) {
			const error = `Circular dependency: ${getStackPaths(
				stack
			)} -> ${filePath}`;
			console.error(error);
			throw new Error(error);
		}

		let config = loadTsConfigFile(filePath);

		stack.push({
			path: filePath,
			compilerOptions: config.compilerOptions ?? {},
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

	console.log(result);

	return result;
}

function loadTsConfigFile(
	filePath: string
): {
	extends?: string;
	compilerOptions?: CompilerOptions;
} {
	try {
		let readTsConfigRes: ReturnType<typeof readConfigFile>;
		let error: Error;

		readTsConfigRes = readConfigFile(filePath, sys.readFile);

		if (readTsConfigRes.error) {
			error = new Error(readTsConfigRes.error.messageText as string);
			// Try with absolute filePath
			readTsConfigRes = readConfigFile(
				resolve(process.cwd(), filePath),
				sys.readFile
			);
		}

		if (readTsConfigRes.error) {
			error = new Error(readTsConfigRes.error.messageText as string);
			// Maybe the path is in the locally installed cwd-level node_modules.
			readTsConfigRes = readConfigFile(
				resolve(process.cwd(), "node_modules", filePath),
				sys.readFile
			);
		}

		if (readTsConfigRes.error) {
			throw error;
		}

		return readTsConfigRes.config;
	} catch (e) {
		const error = `Error loading tsconfig file: ${filePath}.\n Caused by > ${e.stack}`;
		throw new Error(error);
	}
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
