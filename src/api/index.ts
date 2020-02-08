export const fetchData = async (): Promise<ISARIApiResult | null> => {
	const action = 'LatestReport_LIM_View'
	const uri = `https://services8.arcgis.com/PXQv9PaDJHzt8rp0/arcgis/rest/services/${action}/FeatureServer/0/query?f=json&where=1%3D1&outFields=*`
	try {
		const response = await fetch(uri, {
			method: 'Get',
		})

		if (response.status === 200) {
			return response.json()
		} else {
			return null
		}
	} catch (ex) {
		return null
	}
}

export const fetchConfirmedData = async (): Promise<ISARIApiResult | null> => {
	const action = 'Devb2CHP_PDS_Views'
	const uri = `https://services8.arcgis.com/PXQv9PaDJHzt8rp0/arcgis/rest/services/${action}/FeatureServer/0/query?f=json&where=1%3D1&outFields=*`
	try {
		const response = await fetch(uri, {
			method: 'Get',
		})

		if (response.status === 200) {
			return response.json()
		} else {
			return null
		}
	} catch (ex) {
		return null
	}
}
