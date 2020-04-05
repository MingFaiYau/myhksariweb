import moment from 'moment'
import jquery from 'jquery'
import { url } from 'inspector'

const globaldevDomain = `view.inews.qq.com` // 接口正式域名
const globalOffical = `view.inews.qq.com` // 接口正式域名

const api = {
	// 获取其他国家的数据
	// countryData: {
	//   dev: `https://api.inews.sparta.html5.qq.com/newsqa/v1/query/pubished/daily/list?country={country}&`,
	//   test: `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?country={country}&`,
	//   prod: `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?country={country}&`
	// },
	countryData: {
		dev: `https://api.inews.sparta.html5.qq.com/newsqa/v1/automation/foreign/daily/list?country={country}&`,
		test: `https://api.inews.qq.com/newsqa/v1/automation/foreign/daily/list?country={country}&`,
		prod: `https://api.inews.qq.com/newsqa/v1/automation/foreign/daily/list?country={country}&`,
	},
	// 全局数据
	globalData: {
		dev: `https://${globaldevDomain}/g2/getOnsInfo?name=disease_h5_test`,
		test: `https://${globalOffical}/g2/getOnsInfo?name=disease_h5`,
		prod: `https://${globalOffical}/g2/getOnsInfo?name=disease_h5`,
	},
	// 全局拆分其它数据
	othData: {
		dev: `https://${globaldevDomain}/g2/getOnsInfo?name=disease_other_test`,
		test: `https://${globalOffical}/g2/getOnsInfo?name=disease_other`,
		prod: `https://${globalOffical}/g2/getOnsInfo?name=disease_other`,
	},
	// 全局拆分其它数据-海外独立数据
	othDataForeign: {
		dev: `https://${globaldevDomain}/g2/getOnsInfo?name=disease_foreign_test`,
		test: `https://${globalOffical}/g2/getOnsInfo?name=disease_foreign`,
		prod: `https://${globalOffical}/g2/getOnsInfo?name=disease_foreign`,
	},
	// 新闻timeline
	newsList: {
		dev: `https://${globaldevDomain}/g2/getOnsInfo?name=wuwei_ww_time_line`,
		test: `https://${globalOffical}/g2/getOnsInfo?name=wuwei_ww_time_line`,
		prod: `https://${globalOffical}/g2/getOnsInfo?name=wuwei_ww_time_line`,
	},
	// 市折线显示白名单
	cityWhite: {
		dev: `https://${globaldevDomain}/g2/getOnsInfo?name=wuwei_ww_city_list_order`,
		test: `https://${globalOffical}/g2/getOnsInfo?name=wuwei_ww_city_list_order`,
		prod: `https://${globalOffical}/g2/getOnsInfo?name=wuwei_ww_city_list_order`,
	},
	// 省新闻数据
	areNewsList: {
		// https://api.dreamreader.qq.com/news/v1/province/news/list?province_code=
		dev: `https://api.dreamreader.qq.com/news/v1/province/news/list?province_code={rpvcode}&page_size=10`,
		test: `https://api.dreamreader.qq.com/news/v1/province/news/list?province_code={rpvcode}&page_size=10`,
		prod: `https://api.dreamreader.qq.com/news/v1/province/news/list?province_code={rpvcode}&page_size=10`,
		// https://api.dreamreader.qq.com/news/v1/province/news/list?province_code=hb
	},
	uploadImage: {
		dev: `https://yc.static.qq.com/?service=App.Uplode_Uplode.uploads`,
		test: `https://yc.static.qq.com/?service=App.Uplode_Uplode.uploads`,
		prod: `https://yc.static.qq.com/?service=App.Uplode_Uplode.uploads`,
	},
	// 辟谣列表接口
	piyaoList: {
		dev: `https://vp.fact.qq.com/loadmore?page={page}&`,
		test: `https://vp.fact.qq.com/loadmore?page={page}`,
		prod: `https://vp.fact.qq.com/loadmore?page={page}`,
	},
	// 辟谣文章接口
	piyaoDetail: {
		dev: `https://vp.fact.qq.com/miniArtData?id={id}`,
		test: `https://vp.fact.qq.com/miniArtData?id={id}`,
		prod: `https://vp.fact.qq.com/miniArtData?id={id}`,
	},
	// 全国医院接口
	hospitalChina: {
		dev: `https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalProvince`,
		test: `https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalProvince`,
		prod: `https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalProvince`,
	},
	// 全国医院接口
	hospitalArea: {
		dev: `https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalCityByProvince`,
		test: `https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalCityByProvince`,
		prod: `https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalCityByProvince`,
	},
	// 省折线接口
	areaChart: {
		dev: `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province={pro}&`,
		test: `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province={pro}&`,
		prod: `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province={pro}&`,
	},
	// 市折线接口
	cityChart: {
		dev: `https://api.inews.sparta.html5.qq.com/newsqa/v1/query/pubished/daily/list?province={pro}&city={city}`,
		test: `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province={pro}&city={city}&`,
		prod: `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province={pro}&city={city}&`,
	},
	// 省新增折线接口
	// https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=%E6%B9%96%E5%8C%97
	areaAddChart: {
		dev: `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province={pro}`,
		test: `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province={pro}`,
		prod: `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province={pro}`,
	},
	countryNews: {
		dev: `http://inews.qq.com/i/doraemon?channel_key=yq-search-http&pictext_srv_page=0&pictext_srv_enabled=1&pictext_srv_count=10&vertical_search={vertical_search}&query={query}&channel_sig={md5}`,
		test: ``,
		prod: ``,
	},
	// 国内通知
	todayNotice: {
		dev: `https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_ww_today_notice`,
		test: `https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_ww_today_notice`,
		prod: `https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_ww_today_notice`,
	},
	// 国内通知
	globalNotice: {
		dev: `https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_ww_global_notice`,
		test: `https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_ww_global_notice`,
		prod: `https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_ww_global_notice`,
	},
	// 海外国家list（不含地区信息）
	countryList: {
		dev: `https://api.inews.sparta.html5.qq.com/newsqa/v1/automation/foreign/country/ranklist`,
		test: `https://api.inews.qq.com/newsqa/v1/automation/foreign/country/ranklist`,
		prod: `https://api.inews.qq.com/newsqa/v1/automation/foreign/country/ranklist`,
	},
	// 海外曲线：modules参数逗号隔开
	globalStatis: {
		dev: `https://api.inews.sparta.html5.qq.com/newsqa/v1/automation/modules/list?modules={modules}`,
		test: `https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules={modules}`,
		prod: `https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules={modules}`,
	},
}

export const fetchNonChinaRankResult = async () => {
	try {
		const result = await fetch(api.countryList.prod)
		return await result.json()
	} catch (ex) {
		return null
	}
}

export const fetchChinaTotalResult = async (success: TSuccessCallBack, error: TErrorCallBack) => {
	try {
		jquery.ajax({
			url: api.globalData.prod,
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

export const fetchNonChinaResult = async (success: TSuccessCallBack, error: TErrorCallBack) => {
	try {
		jquery.ajax({
			url: api.othDataForeign.prod,
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

export const fetchChinaDailyResult = async (success: TSuccessCallBack, error: TErrorCallBack) => {
	try {
		jquery.ajax({
			url: api.othData.prod,
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
	const action = 'LatestReportHistory_0207_Chart'
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
