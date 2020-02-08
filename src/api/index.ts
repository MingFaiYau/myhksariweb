export const fetchData = async (): Promise<ISARIApiResult | null> => {
	const action = 'LatestReport_LIM_View'
	const uri = `https://services8.arcgis.com/PXQv9PaDJHzt8rp0/arcgis/rest/services/${action}/FeatureServer/0/query?f=json&where=1%3D1&outFields=*`
	try {
		const response = await fetch(uri, {
			method: 'Get',
			headers: {
				// 'Access-Control-Allow-Origin:': '*',
				// 'Access-Control-Allow-Methods': '*',
				// 'Access-Control-Allow-Headers': 'content-type,token,id',
				// 'Access-Control-Request-Headers': 'Origin, X-Requested-With, content-Type, Accept, Authorization',
				// 'Cache-Control': 'no-cache',
			},
		})

		if (response.status === 200) {
			return response.json()
		} else {
			return null
		}
	} catch (ex) {
		console.log('response ex', ex)

		return null
	}
}
