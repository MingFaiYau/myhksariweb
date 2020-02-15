const article_zh: IArticle = {
	id: 'brief',
	title: '疾病資訊',
	content: [
		{
			tag: 'p',
			content: [
				'2019年12月以來，內地湖北省武漢市陸續發現了多例新型冠狀病毒感染的肺炎病例，隨著疫情的蔓延，其他國家/地區亦相繼出現輸入性或本地病例。病徵主要為發熱、咳嗽、有病例出現腹瀉；其中部分病例病情嚴重，出現呼吸困難或肺炎，有死亡病例，亦有治癒出院病例。',
			],
			style: {
				fontWeight: 'normal',
				fontSize: 14,
			},
		},
		{ tag: 'break', content: [''], style: { height: 10 } },
		{
			tag: 'p',
			content: ['疾病介紹'],
			style: {
				fontWeight: 'bold',
				fontSize: 14,
			},
		},
		{
			tag: 'ul',
			content: [
				'傳染源：目前所見傳染源主要是新型冠狀病毒感染的患者。無症狀感染者也可能成為傳染源。',
				'傳播途徑：經呼吸道飛沫和接觸傳播是主要的傳播途徑。氣溶膠和消化道等傳播途徑尚待明確。',
				'易感人群：人群普遍易感。',
				'潛伏期：1-14天，多為3-7天。',
				'症狀：以發熱、乏力、乾咳為主要表現。少數患者伴有鼻塞、流涕、咽痛和腹瀉等症狀。',
				'重症病例：在發病一周後出現呼吸困難和/或低氧血症，嚴重者快速進展為急性呼吸窘迫綜合徵、膿毒症休克、代謝性酸中毒和凝血功能障礙。值得注意的是重症、危重症患者病程中可為中低熱，甚至無明顯發熱。',
				'輕症病例：僅表現為低熱、輕微乏力等，無肺炎表現。',
				'治療及預後：以支持性療法為主，部分病例病情嚴重，有死亡病例，亦有治癒出院病例。年齡較大或有慢性疾病患者，有較大機會出現嚴重情況。',
			],
		},
		{ tag: 'break', content: [''], style: { height: 10 } },
		{
			tag: 'p',
			content: ['甚麼是冠狀病毒？'],
		},
		{
			tag: 'ul',
			content: [
				'冠狀病毒是一類主要引起呼吸道、腸道疾病的病原體。這類病毒顆粒的表面有許多規則排列的突起，整個病毒顆粒就像一頂帝王的皇冠，因此得名“冠狀病毒＂；',
				'冠狀病毒除人類以外，還可感染豬、牛、貓、犬、貂、駱駝、蝙蝠、老鼠、刺蝟等多種哺乳動物以及多種鳥類；',
				'目前為止，已知的人類冠狀病毒共有六種。其中四種冠狀病毒在人群中較為常見，致病性較低，一般僅引起類似普通感冒的輕微呼吸道症狀。另外兩種冠狀病毒—嚴重急性呼吸綜合征冠狀病毒和中東呼吸綜合征冠狀病毒，也就是我們簡稱的SARS 冠狀病毒和MERS 冠狀病毒，可引起嚴重的呼吸系統疾病；',
				'引起此次疫情的新型冠狀病毒不同於已發現的人類冠狀病毒，對該病毒的深入瞭解需要進一步科學研究。',
			],
		},
		{ tag: 'break', content: [''], style: { height: 10 } },
		{
			tag: 'a',
			content: ['資料來源 - 澳門政府抗疫專頁(2020-02-06)'],
			href: 'https://www.ssm.gov.mo/apps1/PreventWuhanInfection/ch.aspx#clg17045',
			style: { display: 'flex', flexDirection: 'row-reverse', fontSize: 8 },
		},
	],
}

const article_en: IArticle = {
	id: 'brief',
	title: 'Brief Intro on 2019nCOV',
	content: [
		{
			tag: 'p',
			content: [
				'Since December 2019, multiple pneumonia cases associated with novel coronavirus infection (2019-nCov) have been reported in Wuhan, Hubei Province of the mainland. As the situation evolves, imported and local cases have also been reported in other countries and regions. Signs of infection are mainly fever and cough, while some cases have experienced diarrhoea. Some cases in serious condition have presented with breathing difficulties and pneumonia; fatal cases have been reported, and there are also cases recovered and discharged from hospital.',
			],
			style: {
				fontWeight: 'normal',
				fontSize: 14,
			},
		},
		{ tag: 'break', content: [''], style: { height: 10 } },
		{
			tag: 'p',
			content: ['Facts about the disease'],
			style: {
				fontWeight: 'bold',
				fontSize: 14,
			},
		},
		{
			tag: 'ul',
			content: [
				'Source of infection：So far, source of infection are mainly patients of novel coronavirus infection. Asymptomatic patients are also possible source of infection.',
				'Mode of transmission：Mainly transmitted through respiratory droplets and contact. Whether aerosol and digestive tract infections are transmission modes are still under investigation.',
				'Susceptible population：Generally susceptible.',
				'Incubation period：1-14 days, usually 3-7 days.',
				'Clinical features：Fever, weakness and dry cough are the main manifestations; some may also develop symptoms like nasal obstruction, runny nose, sore throat or diarrhoea.',
				'Severe cases：Most cases develop dyspnoea and/or hypoxemia; severe cases develop rapidly into ARDS (Acute Respiratory Distress Syndrome), septic shock, metabolic acidosis and coagulation dysfunction. It should be noted that the course of severe and critical patients can be moderate to low fever or even no obvious fever.',
				'Mild cases：Mild cases may only have mild symptoms like low fever and fatigue, but no presentation of pneumonia.',
				'Management and prognosis：Treatment is mainly supportive. Some cases are in severe condition; fatal cases have been reported, and there are also cases recovered and discharged from hospital. Older patients and people with chronic diseases are at higher risk of developing severe illness.',
				'',
				'',
				'',
				'',
			],
		},
		{ tag: 'break', content: [''], style: { height: 10 } },
		{
			tag: 'p',
			content: ['What is coronavirus?'],
		},
		{
			tag: 'ul',
			content: [
				'Coronavirus is a family of pathogenic agents that mainly affect the respiratory tract and the intestinal tract. The virus is so named because the spikes on the surface of the virus particle resemble a crown, which in Latin is “corona”.',
				'In addition to human beings, coronavirus can also affect mammals like pigs, cattle, cats, dogs, minks, camels, bats, mice, hedgehogs and a variety of birds;',
				'There are currently six known strains of human coronaviruses. Four of them are more common among human beings and are less pathogenic, usually only cause mild respiratory symptoms similar to those of common cold. The other two, the Severe Acute Respiratory Syndrome Coronavirus (SARS-CoV) and Middle East Respiratory Syndrome Coronavirus (MERS-CoV), are capable of causing severe respiratory illnesses;',
				'The novel coronavirus associated with the current outbreak is a new strain of coronavirus that is different from the human coronaviruses previously identified. Further scientific research is needed in order to know more about the virus.',
				'',
				'',
			],
		},
		{ tag: 'break', content: [''], style: { height: 10 } },
		{
			tag: 'a',
			content: ['Source - Macau Special Webpage Aginst Epidemics (2020-02-06)'],
			href: 'https://www.ssm.gov.mo/apps1/PreventWuhanInfection/en.aspx#clg17045',
			style: { display: 'flex', flexDirection: 'row-reverse', fontSize: 8 },
		},
	],
}

const brief = { article_zh, article_en }
export { brief }
