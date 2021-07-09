import { access } from "fs/promises";

export async function doesExists(path: string) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}
