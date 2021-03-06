const article_zh: IArticle = {
	id: 'useful_links',
	title: '相關鏈結',
	content: [
		{
			tag: 'p',
			content: '各地衛生組織 抗疫專頁',
			style: {
				fontWeight: 'bold',
				fontSize: 14,
			},
		},
		{
			tag: 'ul',
			content: [
				{
					tag: 'a',
					content: '世界衛生組織',
					href: 'https://www.who.int/zh/emergencies/diseases/novel-coronavirus-2019',
				},
				{
					tag: 'a',
					content: '中國衛健委',
					href: 'http://www.nhc.gov.cn/xcs/xxgzbd/gzbd_index.shtml',
				},
				{
					tag: 'a',
					content: '香港',
					href: 'https://www.chp.gov.hk/tc/features/102465.html',
				},
				{
					tag: 'a',
					content: '澳門',
					href: 'https://www.ssm.gov.mo/apps1/PreventWuhanInfection/ch.aspx#clg17458',
				},
				{
					tag: 'a',
					content: '台灣',
					href: 'https://www.cdc.gov.tw/Disease/SubIndex/N6XvFa1YP9CXYdB0kNSA9A',
				},
				{
					tag: 'a',
					content: '新加坡',
					href: 'https://www.moh.gov.sg/2019-ncov-wuhan',
				},
			],
		},
		{
			tag: 'p',
			content: '各地媒體 疫情新聞',
			style: {
				fontWeight: 'bold',
				fontSize: 14,
			},
		},
		{
			tag: 'ul',
			content: [
				{
					tag: 'a',
					content: '香港 Now新聞',
					href:
						'https://news.now.com/home',
				},
				{
					tag: 'a',
					content: '香港 香港01',
					href: 'https://www.hk01.com',
				},
				{
					tag: 'a',
					content: '中國全國疫情地圖及抗疫資料 丁香園',
					href: 'https://ncov.dxy.cn/ncovh5/view/pneumonia',
				},
			],
		},
	],
}

const article_en: IArticle = {
	id: 'useful_links',
	title: 'Useful Links',
	content: [
		{
			tag: 'p',
			content: 'Government / authority websites',
			style: {
				fontWeight: 'bold',
				fontSize: 14,
			},
		},
		{
			tag: 'ul',
			content: [
				{
					tag: 'a',
					content: 'World Health Organization',
					href: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019',
				},
				{
					tag: 'a',
					content: 'Mainland China',
					href: 'http://www.nhc.gov.cn/xcs/xxgzbd/gzbd_index.shtml',
				},
				{
					tag: 'a',
					content: 'Hong Kong',
					href: 'https://www.chp.gov.hk/en/features/102465.html',
				},
				{
					tag: 'a',
					content: 'Macau',
					href: 'https://www.ssm.gov.mo/apps1/PreventWuhanInfection/en.aspx#clg17458',
				},
				{
					tag: 'a',
					content: 'Taiwan',
					href: 'https://www.cdc.gov.tw/En',
				},
				{
					tag: 'a',
					content: 'Singapore',
					href: 'https://www.moh.gov.sg/2019-ncov-wuhan',
				},
			],
		},
		{
			tag: 'p',
			content: 'News Updates',
			style: {
				fontWeight: 'bold',
				fontSize: 14,
			},
		},
		{
			tag: 'ul',
			content: [
				{
					tag: 'a',
					content: 'HK - South China Morning Post',
					href:
						'https://www.scmp.com/hk',
				},
				{
					tag: 'a',
					content: 'Singapore - CNA',
					href: 'https://www.channelnewsasia.com/news/international',
				},
				{
					tag: 'a',
					content: 'Mainland China - Global Times',
					href: 'https://www.globaltimes.cn//special-coverage/Coronavirus-Outbreak.html',
				},
			],
		},
	],
}

const links = { article_zh, article_en }
export { links }
