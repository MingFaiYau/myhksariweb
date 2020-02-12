import React from 'react'
import { Line } from 'react-chartjs-2'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'
import { color, tool, size } from '../common'
import moment from 'moment'
import { fetchHKHistoryResult } from '../api'
import withWidth from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

interface IHKResultChartProps {
	width: Breakpoint
	latestData: ISARIHKResult
}

const HKResultChart: React.FC<IHKResultChartProps> = (props) => {
	const { width, latestData } = props
	const classes = useStyles()
	const { formatMessage: f } = useIntl()

	const [data, setData] = React.useState<ISARIHKResult[] | null>(null)

	React.useEffect(() => {
		fetchHKHistoryResult().then((data) => {
			if (data?.features && data.features.length > 0) {
				const result = data.features
				setData(result)
			} else {
				setData(null)
			}
		})
	}, [])

	const getLatestMonth = width === 'xs' || width === 'sm'

	if (!data || !latestData) return <div />

	const xaix: string[] = []
	const dailyConfirmedData: number[] = []
	const dailyInhostData: number[] = []

	let hasLatest = false
	const latestDate = moment(latestData.attributes.As_of_date).format('MM/DD')

	let index = 0
	for (const history of data) {
		if (getLatestMonth && data.length - index > 30) {
			index = index + 1
			continue
		}

		if (latestDate === history.attributes.As_of_date.toString()) {
			hasLatest = true
			dailyConfirmedData.push(latestData.attributes.Number_of_confirmed_cases)
			dailyInhostData.push(latestData.attributes.Number_of_cases_still_hospitali)
		} else {
			dailyConfirmedData.push(history.attributes.Number_of_confirmed_cases)
			dailyInhostData.push(history.attributes.Number_of_cases_still_hospitali)
		}

		xaix.push(
			tool.convertToDate(
				history.attributes.As_of_date.toString(),
				'DD/MM/YYYY',
				'YYYY-MM-DD',
			),
		)
		index = index + 1
	}

	if (!hasLatest) {
		xaix.push(moment(latestData.attributes.As_of_date).format('YYYY-MM-DD'))
		dailyConfirmedData.push(latestData.attributes.Number_of_confirmed_cases)
		dailyInhostData.push(latestData.attributes.Number_of_cases_still_hospitali)
	}

	const data2 = {
		labels: xaix,
		datasets: [
			{
				label: f({ id: 'chart_title_confirmed' }),
				fill: false,
				lineTension: 0.1,
				backgroundColor: color.confirmed,
				borderColor: color.confirmed,
				// point
				pointBorderColor: color.confirmed,
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				// hover
				pointHoverRadius: 5,
				pointHoverBackgroundColor: color.confirmed,
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 2,
				pointHitRadius: 10,
				data: dailyConfirmedData,
			},
			{
				label: f({ id: 'chart_title_suspected' }),
				fill: false,
				lineTension: 0.1,
				backgroundColor: color.black,
				borderColor: color.black,
				// point
				pointBorderColor: color.black,
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				// hover
				pointHoverRadius: 5,
				pointHoverBackgroundColor: color.black,
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 2,
				pointHitRadius: 10,
				data: dailyInhostData,
			},
		],
	}

	const legend = {
		display: true,
		position: 'top',
		fullWidth: false,
		reverse: false,
		labels: {
			boxWidth: 10,
			fontColor: 'rgb(0, 0, 0)',
			usePointStyle: true,
		},
	}

	const options = {
		scales: {
			xAxes: [
				{
					type: 'time',
					time: {
						unit: 'week',
						displayFormats: { week: 'MM/DD' },
					},
				},
			],
		},
	}
	return (
		<div>
			<div className={classes.container}>
				<Line data={data2} legend={legend} options={options} />
			</div>
		</div>
	)
}

const useStyles = makeStyles({
	container: {
		overflowX: 'scroll',
		margin: '20px 20px',
	},
	date: {
		margin: 10,
		fontSize: size.font_date,
		fontWeight: 'bold',
		textAlign: 'end',
	},
	firstDataView: {
		margin: 20,
		display: 'flex',
		flexDirection: 'column',
	},
	txtConfirmed: {
		fontSize: 100,
		lineHeight: '90px',
		fontWeight: 'bold',
		textAlign: 'center',
		color: color.confirmed,
	},
	txtConfirmedTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: color.confirmed,
	},
	secondDataView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		margin: '25px 10px 30px 10px',
	},
	lastDataView: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: color.footer,
		padding: '30px 10px 20px 10px',
	},
	txtInvesting: {
		fontSize: 50,
		fontWeight: 'bold',
		textAlign: 'center',
		color: color.black,
	},
	txtInvestingTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: color.black,
	},
	txtRef: {
		fontSize: 8,
		margin: '10px 10px 20px 10px',
		textAlign: 'end',
		color: color.black,
	},
	disclaimer: {
		margin: '20px 10px',
	},
	txtDisclaimerTitle: {
		fontSize: 8,
		fontWeight: 'bold',
		color: color.disclaimer,
	},
	txtDisclaimerContent: {
		fontSize: 8,
		color: color.disclaimer,
	},
})

export default withWidth()(React.memo(HKResultChart))
