export const fetchData = async () => {
	const action = 'LatestReport_LIM_View'
	const uri = `https://services8.arcgis.com/PXQv9PaDJHzt8rp0/arcgis/rest/services/${action}/FeatureServer/0/query?f=json&where=1%3D1&outFields=*`
	try {
		const response = await fetch(uri, {
			method: 'Get',
			headers: {
				'content-type': 'application/json',
				'access-control-allow-origin': '*',
				Accept: '*/*',
				'Cache-Control': 'no-cache',
				'Accept-Encoding': 'gzip, deflate',
				Connection: 'keep-alive',
				'cache-control': 'no-cache',
			},
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
