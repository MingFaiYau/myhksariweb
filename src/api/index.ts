import moment from 'moment'

export const fetchData = async (): Promise<ISARIApiResult | null> => {
	const action = 'LatestReport_LIM_View'
	const uri = `https://services8.arcgis.com/PXQv9PaDJHzt8rp0/arcgis/rest/services/${action}/FeatureServer/0/query?f=json&where=1%3D1&outFields=*`
	try {
		const response = await fetch(uri, {
			method: 'Get',
		})

		if (response.status === 200) {
			const data = await response.json()
			return data
		} else {
			return null
		}
	} catch (ex) {
		return null
	}
}

export const fetchConfirmedData = async (
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
				return null // fetchConfirmedData(date)
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