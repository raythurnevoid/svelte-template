export interface BaseInput {
	env: BaseEnv;
}

export interface BaseEnv {
	production: boolean;
	analyzeBundle?: boolean;
	server?: boolean;
	fancyProgress: boolean;
}
