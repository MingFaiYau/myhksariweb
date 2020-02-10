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
			],
		},
		{
			tag: 'p',
			content: '香港本地媒體',
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
					content: 'Now新聞',
					href:
						'https://news.now.com/home/local/player?newsId=380014&catCode=123&topicId=1031',
				},
				{
					tag: 'a',
					content: '香港01',
					href: 'https://www.hk01.com/%E7%A4%BE%E6%9C%83%E6%96%B0%E8%81%9E/429385/',
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
			],
		},
		{
			tag: 'p',
			content: '香港本地媒體',
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
					content: 'Now新聞',
					href:
						'https://news.now.com/home/local/player?newsId=380014&catCode=123&topicId=1031',
				},
				{
					tag: 'a',
					content: '香港01',
					href: 'https://www.hk01.com/%E7%A4%BE%E6%9C%83%E6%96%B0%E8%81%9E/429385/',
				},
			],
		},
	],
}

const links = { article_zh, article_en }
export { links }
