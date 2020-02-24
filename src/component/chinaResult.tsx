import React from 'react'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { Header } from '.'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import { fetchQQChinaResult, fetchQQNewChinaResult } from '../api'
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

	const [data, setData] = React.useState<ISARIChinaResult | null>(null)
	const [chinaDayAddList, setChinaDayAddList] = React.useState<DailyData[]>([])

	React.useEffect(() => {
		fetchQQNewChinaResult(
			(res) => {
				try {
					const data = JSON.parse(res.data) as ISARIChinaResult
					setChinaDayAddList(data.chinaDayAddList)
				} catch (ex) {}
			},
			(_) => {},
		)

		fetchQQChinaResult(
			(res) => {
				try {
					const data = JSON.parse(res.data) as ISARIChinaResult
					setData(data)
				} catch (ex) {}
			},
			(_) => {},
		)
	}, [])

	let itemSize = '100px'
	if (width === 'xs' || width === 'sm') {
		itemSize = 'calc( ( 100vw - 50px ) / 3  )'
	} else {
		itemSize = 'calc( 100vw / 9 )'
	}

	if (!data) return <div />

	let confirm_china = data.chinaTotal.confirm
	let new_confirm_china = data.chinaAdd.confirm
	let heal_china = data.chinaTotal.heal
	let new_heal_china = data.chinaAdd.heal
	let dead_china = data.chinaTotal.dead
	let new_dead_china = data.chinaAdd.dead

	let confirm_other = 0
	let new_confirm_other = 0
	let heal_other = 0
	let new_heal_other = 0
	let dead_other = 0
	let new_dead_other = 0

	let xaix_confirmed_other: string[] = []
	let data_confirmed_other: number[] = []
	let color_confirmed_other: string[] = []

	data.areaTree.forEach((region, index) => {
		if (index > 0) {
			confirm_other += region.total.confirm
			new_confirm_other += region.today.confirm ? region.today.confirm : 0

			heal_other += region.total.heal
			new_heal_other += region.today.heal ? region.today.heal : 0

			dead_other += region.total.dead
			new_dead_other += region.today.dead ? region.today.dead : 0

			if (index < 5) {
				xaix_confirmed_other.push(region.name)
				data_confirmed_other.push(region.total.confirm)
				if (index === 1) {
					color_confirmed_other.push(color.chart_selected)
				} else {
					color_confirmed_other.push(color.chart_data)
				}
			}
		}
	})

	let xaix_confirmed_china: string[] = []
	let data_confirmed_china: number[] = []
	chinaDayAddList.forEach((data) => {
		const date = data.date as string
		xaix_confirmed_china.push(tool.convertToDate(`2020.${date}`, 'YYYY.MM.DD', 'YYYY-MM-DD'))
		data_confirmed_china.push(data.confirm)
	})

	const datasets_china: IChartData[] = [
		{
			label: f({ id: 'chart_title_confirmed_daily_add' }),
			color: color.confirmed,
			data: data_confirmed_china,
		},
	]

	const datasets_other: IChartData[] = [
		{
			label: f({ id: 'chart_title_confirmed_other_confirmed' }),
			color: color_confirmed_other,
			data: data_confirmed_other,
		},
	]

	return (
		<div className={classes.container}>
			<Header id='china' title={f({ id: 'slide_item_7' })} />
			<div className={classes.date}>
				{f({ id: 'date_statu_as' }, { date: data.lastUpdateTime })}
			</div>
			<div className={classes.title}>{f({ id: 'title_greater_china' })}</div>
			<div className={classes.content}>
				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{confirm_china}</span>
						<span className={classes.smallValue}>{`( + ${new_confirm_china} )`}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_confirmed2' })}</div>
				</div>

				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{`${heal_china}`}</span>
						<span className={classes.smallValue}>{`( + ${new_heal_china} )`}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_discharged' })}</div>
				</div>
				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{dead_china}</span>
						<span className={classes.smallValue}>{`( + ${new_dead_china} )`}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_deceased' })}</div>
				</div>
			</div>
			{xaix_confirmed_china.length > 0 && (
				<div className={classes.chartView}>
					<LineChart
						xaix={xaix_confirmed_china}
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
			<div className={classes.chartView}>
				<BarChart
					xaix={xaix_confirmed_other}
					datasets={datasets_other}
					xIsTime={false}
					stepSize={150}
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
