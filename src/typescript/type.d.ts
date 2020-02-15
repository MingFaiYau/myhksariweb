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
type TFilterOptionValue = 'none' | 'case' | 'hospital' | 'resident' | 'gender'
type TFilterCondiationValue = 'none' | 'equal' | 'smaller' | 'bigger'
type TTimeUnit =
	| 'week'
	| 'second'
	| 'minute'
	| 'hour'
	| 'day'
	| 'week'
	| 'month'
	| 'quarter'
	| 'year'

type TSuccessCallBack = (res: ISARIChinaApiResult) => void
type TErrorCallBack = (error: any) => void
