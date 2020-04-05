import React from 'react'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { Header } from '.'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import {
	fetchChinaTotalResult,
	fetchChinaDailyResult,
	fetchNonChinaResult,
	fetchNonChinaRankResult,
} from '../api'
import { color, size, tool } from '../common'
import withWidth from '@material-ui/core/withWidth'
import LineChart from './lineChart'
import BarChart from './barChart'

interface IChinaResultProps {
	width: Breakpoint
}

const ChinaResult: React.FC<IChinaResultProps> = (props) => {
	const { width } = props
	const classes = useStyles()
	const { formatMessage: f } = useIntl()

	const [chinaTotalResult, setChinaTotalResult] = React.useState<IChinaTotalResult | null>(null)
	const [chinaDailyResult, setChinaDailyResult] = React.useState<IChinaDailyResult | null>(null)
	const [nonChainResult, setNonChainResult] = React.useState<INonChinaResult | null>(null)
	const [nonChainRankList, setNonChainRankList] = React.useState<IRecordData[]>([])

	React.useEffect(() => {
		fetchChinaTotalResult(
			(res) => {
				try {
					const data = JSON.parse(res.data) as IChinaTotalResult
					setChinaTotalResult(data)
				} catch (ex) {}
			},
			(_) => {},
		)

		fetchChinaDailyResult(
			(res) => {
				try {
					const data = JSON.parse(res.data) as IChinaDailyResult
					setChinaDailyResult(data)
				} catch (ex) {}
			},
			(_) => {},
		)

		fetchNonChinaResult(
			(res) => {
				try {
					const data = JSON.parse(res.data) as INonChinaResult
					console.log('fetchNonChinaResult', data)
					setNonChainResult(data)
				} catch (ex) {}
			},
			(_) => {},
		)

		fetchNonChinaRankResult().then((res) => {
			const data = res.data as IRecordData[]
			setNonChainRankList(data)
		})
	}, [])

	let itemSize = '100px'
	if (width === 'xs' || width === 'sm') {
		itemSize = 'calc( ( 100vw - 50px ) / 3  )'
	} else {
		itemSize = 'calc( 100vw / 9 )'
	}

	// chain total
	if (!chinaTotalResult) return <div />

	let confirm_china = chinaTotalResult.chinaTotal.confirm
	let confirm_china_added = chinaTotalResult.chinaAdd.confirm
	let heal_china = chinaTotalResult.chinaTotal.heal
	let heal_china_added = chinaTotalResult.chinaAdd.heal
	let dead_china = chinaTotalResult.chinaTotal.dead
	let dead_china_added = chinaTotalResult.chinaAdd.dead

	// china daily
	let xaix_daily_confirm: string[] = []
	let data_daily_confirm: number[] = []

	if (chinaDailyResult) {
		chinaDailyResult.chinaDayAddList.forEach((data) => {
			const date = data.date as string
			xaix_daily_confirm.push(tool.convertToDate(`2020.${date}`, 'YYYY.MM.DD', 'YYYY-MM-DD'))
			data_daily_confirm.push(data.confirm)
		})
	}

	const datasets_china: IChartData[] = [
		{
			label: f({ id: 'chart_title_confirmed_daily_add' }),
			color: color.confirmed,
			data: data_daily_confirm,
		},
	]

	// other
	let confirm_other = nonChainResult ? nonChainResult.globalStatis.confirm : 0
	let heal_other = nonChainResult ? nonChainResult.globalStatis.heal : 0
	let dead_other = nonChainResult ? nonChainResult.globalStatis.dead : 0

	// other daily chart
	let xaix_confirmed_other: string[] = []
	let data_confirmed_other: number[] = []
	/*
	if (nonChainResult) {
		nonChainResult.globalDailyHistory.forEach((data) => {
			const date = data.date as string
			xaix_confirmed_other.push(
				tool.convertToDate(`2020.${date}`, 'YYYY.MM.DD', 'YYYY-MM-DD'),
			)
			data_confirmed_other.push(data.all.confirm)
		})
	}
	*/
	const datasets_other: IChartData[] = [
		{
			label: f({ id: 'chart_title_confirmed_daily_add' }),
			color: color.confirmed,
			data: data_confirmed_other,
		},
	]

	// top ten
	let xaix_top_ten_other: string[] = []
	let data_top_ten_other: number[] = []
	let color_top_ten_othe: string[] = []

	if (nonChainRankList) {
		nonChainRankList.forEach((region, index) => {
			if (index < 10) {
				xaix_top_ten_other.push(region.name)
				data_top_ten_other.push(region.confirm)
				if (index === 0) {
					color_top_ten_othe.push(color.chart_selected)
				} else {
					color_top_ten_othe.push(color.chart_data)
				}
			}
		})
	}

	const datasets_top_ten: IChartData[] = [
		{
			label: f({ id: 'chart_title_confirmed_other_confirmed' }),
			color: color_top_ten_othe,
			data: data_top_ten_other,
		},
	]

	return (
		<div className={classes.container}>
			<Header id='china' title={f({ id: 'slide_item_7' })} />
			<div className={classes.date}>
				{f({ id: 'date_statu_as' }, { date: chinaTotalResult.lastUpdateTime })}
			</div>
			<div className={classes.title}>{f({ id: 'title_greater_china' })}</div>
			<div className={classes.content}>
				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{confirm_china}</span>
						<span className={classes.smallValue}>{`( + ${confirm_china_added} )`}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_confirmed2' })}</div>
				</div>

				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{`${heal_china}`}</span>
						<span className={classes.smallValue}>{`( + ${heal_china_added} )`}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_discharged' })}</div>
				</div>
				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{dead_china}</span>
						<span className={classes.smallValue}>{`( + ${dead_china_added} )`}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_deceased' })}</div>
				</div>
			</div>
			{xaix_daily_confirm.length > 0 && (
				<div className={classes.chartView}>
					<LineChart
						xaix={xaix_daily_confirm}
						datasets={datasets_china}
						stepSize={2000}
					/>
				</div>
			)}
			<div className={classes.title}>{f({ id: 'title_oversea' })}</div>
			<div className={classes.content}>
				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{confirm_other}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_confirmed2' })}</div>
				</div>

				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{heal_other}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_discharged' })}</div>
				</div>
				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{dead_other}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_deceased' })}</div>
				</div>
			</div>
			{xaix_confirmed_other.length > 0 && (
				<div className={classes.chartView}>
					<LineChart
						xaix={xaix_confirmed_other}
						datasets={datasets_other}
						stepSize={10000}
					/>
				</div>
			)}
			<div className={classes.chartView}>
				<BarChart
					xaix={xaix_top_ten_other}
					datasets={datasets_top_ten}
					xIsTime={false}
					stepSize={10000}
					showBox={false}
				/>
			</div>

			<div className={classes.txtRef}>
				<a
					href='https://news.qq.com/zt2020/page/feiyan.htm'
					target='_blank'
					rel='noopener noreferrer'
				>
					{f({ id: 'ref_chinaresult' })}
				</a>
			</div>
			<div className={classes.disclaimer}>
				<p className={classes.txtDisclaimerContent}>{f({ id: 'discharged_standard' })}</p>
			</div>
		</div>
	)
}

const useStyles = makeStyles({
	container: {},
	date: {
		margin: 10,
		fontSize: size.font_date,
		fontWeight: 'bold',
		textAlign: 'end',
	},
	title: {
		margin: '30px 10px 0 10px',
		fontSize: size.font_title,
		fontWeight: 'bold',
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		margin: '0 10px 0 10px',
	},
	item: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		borderRadius: '20px',
		overflow: 'hidden',
		margin: '10px 5px',
		backgroundColor: color.header,
	},
	value: {
		flex: 1,
		textAlign: 'center',
		fontSize: 25,
		fontWeight: 'bold',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	smallValue: {
		fontSize: 12,
		lineHeight: '15px',
		color: color.confirmed,
	},
	itemTitle: {
		textAlign: 'center',
		fontSize: size.font_item_title,
		fontWeight: 'bold',
		padding: '7px 7px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: color.disclaimer,
	},
	txtRef: {
		fontSize: size.font_ref,
		margin: '10px 10px 10px 10px',
		textAlign: 'end',
		color: color.black,
	},
	disclaimer: {
		margin: '20px 10px',
	},
	txtDisclaimerContent: {
		fontSize: 8,
		color: color.disclaimer,
	},
	chartView: {
		padding: '0px 10px 0px 10px',
	},
})

export default withWidth()(React.memo(ChinaResult))
