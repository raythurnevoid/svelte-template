export interface BaseInput {
	env: BaseEnv;
}

export interface BaseEnv {
	production: boolean;
	analyzeBundle?: boolean;
	sapper?: boolean;
	server?: boolean;
}
