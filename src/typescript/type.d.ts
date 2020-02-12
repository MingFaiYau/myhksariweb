type THeaderType = 'Main' | 'Confirmed' | 'SlideMenu' | 'None'
type TElementId =
	| 'overview'
	| 'china'
	| 'overview_confirmed'
	| 'precaution'
	| 'brief'
	| 'slide_menu'
	| 'useful_links'
	| 'map'
type THtmlTag = 'p' | 'ul' | 'break' | 'a'
type TPercaution = 'percaution_zh' | 'percaution_en'

type TSuccessCallBack = (res: ISARIChinaApiResult) => void
type TErrorCallBack = (error: any) => void
