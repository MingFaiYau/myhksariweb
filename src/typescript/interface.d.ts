declare namespace NodeJS {
	export interface ProcessEnv {
		HOST: string
		DB_URL: string
		DB_NAME?: string
		PUBLIC_URL: string
		NODE_ENV: string
	}
}

interface ISARIApiResult {
	features: { attributes: ISARIResult }[]
}

interface ISARIResult {
	As_of_date: number
	As_of_time: string
	Number_of_confirmed_cases: number
	Number_of_ruled_out_cases: number
	Number_of_cases_still_hospitali: number
	Number_of_cases_fulfilling_the_: number
	latitude: number
	longitude: number
	OBJECTID: number
	Death: number
	Discharged: number
	created_user: string
	created_date: number
	last_edited_user: string
	last_edited_date: number
}
