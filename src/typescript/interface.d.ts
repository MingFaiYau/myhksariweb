declare namespace NodeJS {
	export interface ProcessEnv {
		HOST: string
		DB_URL: string
		DB_NAME?: string
		PUBLIC_URL: string
		NODE_ENV: string
	}
}

interface ISARIChinaApiResult {
	ret: number
	data: string
}

interface ISARIChinaResult {
	lastUpdateTime: string
	isShowAdd: boolean
	chinaTotal: DailyData
	chinaAdd: DailyData
	chinaDayList: DailyData[]
	chinaDayAddList: DailyData[]

	areaTree: RegionData[]
}

interface RegionData {
	name: string
	today: DailyData
	total: DailyData
}
interface DailyData {
	confirm: number
	suspect: dead
	dead: number
	heal: number
	showRate?: boolean
	showRate?: boolean
	showHeal?: number
	healRate?: number
	date?: number
	isUpdated?: boolean
}

interface ISARIHKApiResult {
	features: ISARIHKResult[]
}

interface ISARIHKResult {
	attributes: {
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
}

interface ISARIConfirmedApiResult {
	features: ISARIConfirmedCase[]
}

interface ISARIConfirmedCase {
	attributes: {
		Case_no_: number
		Date_of_laboratory_confirmation: string
		Date_of_onset: string
		Gender: string
		Age: number
		Name_of_hospital_admitted: string
		Hospitalised_Discharged_Decease: string
		HK_Non_HK_resident: string
		Case_classification: string
		個案編號: number
		實驗室確診報告日期: string
		發病日期: string
		性別: string
		年齡: number
		入住醫院名稱: string
		住院_出院_死亡: string
		香港_非香港居民: string
		個案分類: string
		Latitude: number
		Longitude: number
		ObjectId: number
	}
}

interface ISlideMenuItem {
	title: string
	target?: TElementId
}

interface IArticle {
	id: TElementId
	title: string
	subTitle?: string
	content: IArticleContent[]
}

interface IArticleContent {
	tag: THtmlTag
	content: IArticleContent[] | IArticleContent | string[] | string
	href?: string
	style?: any
}

interface INews {
	title: string
	description: string
	href: string
	ref?: string
}
