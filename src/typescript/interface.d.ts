declare namespace NodeJS {
	export interface ProcessEnv {
		HOST: string
		DB_URL: string
		DB_NAME?: string
        PUBLIC_URL: string
        NODE_ENV:string
	}
}
