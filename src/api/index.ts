import moment from 'moment'
import jquery from 'jquery'

export const fetchQQChinaResult = async (success: TSuccessCallBack, error: TErrorCallBack) => {
	const uri = 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5'
	try {
		jquery.ajax({
			url: uri,
			dataType: 'jsonp',
			scriptCharset: 'UTF-8',
			jsonp: 'callback',
			success: success,
			error: error,
		})
	} catch (ex) {
		return null
	}
}

export const fetchHKResult = async (): Promise<ISARIHKApiResult | null> => {
	const action = 'LatestReport_LIM_View'
	const uri = `https://services8.arcgis.com/PXQv9PaDJHzt8rp0/arcgis/rest/services/${action}/FeatureServer/0/query?f=json&where=1%3D1&outFields=*`
	try {
		const response = await fetch(uri, {
			method: 'Get',
		})

		if (response.status === 200) {
			const data = await response.json()
			if (data.error) {
				return null
			} else {
				return data
			}
		} else {
			return null
		}
	} catch (ex) {
		return null
	}
}

export const fetchHKHistoryResult = async (): Promise<ISARIHKApiResult | null> => {
	const action = 'LatestReportHistory_0207_View'
	const uri = `https://services8.arcgis.com/PXQv9PaDJHzt8rp0/arcgis/rest/services/${action}/FeatureServer/0/query?f=json&where=1%3D1&outFields=*`
	try {
		const response = await fetch(uri, {
			method: 'Get',
		})

		if (response.status === 200) {
			const data = await response.json()
			if (data.error) {
				return null
			} else {
				return data
			}
		} else {
			return null
		}
	} catch (ex) {
		return null
	}
}

export const fetchHKConfirmedData = async (
	selectedDate?: moment.Moment,
): Promise<ISARIConfirmedApiResult | null> => {
	// const date = selectedDate ? selectedDate.add(-1, 'day') : moment()
	// const action = `HKConfirmedCases_${date.format('MMDD')}_View`
	const action = `HKConfirmedCases_0208_View`
	const uri = `https://services8.arcgis.com/PXQv9PaDJHzt8rp0/arcgis/rest/services/${action}/FeatureServer/0/query?f=json&where=1%3D1&outFields=*`
	try {
		const response = await fetch(uri, {
			method: 'Get',
		})
		if (response.status === 200) {
			const data = await response.json()
			if (data.error) {
				return null
			} else {
				return data
			}
		} else {
			return null
		}
	} catch (ex) {
		return null
	}
}
