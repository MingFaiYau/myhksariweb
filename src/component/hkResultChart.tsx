import React from 'react'
import { Line, Bar } from 'react-chartjs-2'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'
import { color } from '../common'
import withWidth from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

Chart.plugins.register(ChartDataLabels)

const getLineSetting = (mainColor: string) => {
	return {
		fill: false,
		lineTension: 0.1,
		backgroundColor: mainColor,
		borderColor: mainColor,
		// point
		pointBorderColor: mainColor,
		pointBackgroundColor: color.white,
		pointBorderWidth: 1,
		// hover
		pointHoverRadius: 5,
		pointHoverBackgroundColor: mainColor,
		pointHoverBorderColor: mainColor,
		pointHoverBorderWidth: 2,
		pointRadius: 2,
		pointHitRadius: 10,
	}
}

const getBarSetting = (mainColor: string) => {
	return {
		backgroundColor: mainColor,
		borderColor: mainColor,
		borderWidth: 1,
		hoverBackgroundColor: mainColor,
		hoverBorderColor: mainColor,
	}
}

const legend: Chart.ChartLegendOptions = {
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

const createOption = (
	displayValue: boolean,
	stepSize: number,
	unit: TTimeUnit = 'week',
	unitFormat = 'MM/DD',
	// eslint-disable-next-line max-params
): Chart.ChartOptions => {
	return {
		plugins: {
			datalabels: {
				color: color.black,
				anchor: 'end',
				align: 'top',
				display: function(context) {
					if (!displayValue) return false
					if (context.dataset && context.dataset.data) {
						let index = context.dataIndex
						let value = context.dataset.data[index] as number
						return value > 0
					}
					return false
				},
				font: {
					size: 12,
					weight: 'bold',
				},
			},
		},
		scales: {
			xAxes: [
				{
					type: 'time',
					time: {
						unit: unit,
						displayFormats: { [unit]: unitFormat },
					},
				},
			],
			yAxes: [
				{
					ticks: {
						beginAtZero: false,
						stepSize: stepSize,
					},
				},
			],
		},
	}
}

interface IHKResultChartProps {
	width: Breakpoint
	xaix_toal: string[]
	xaix_daily: string[]
	dailyConfirmedData: number[]
	totalConfirmedData: number[]
	totalHospitaliData: number[]
}

const HKResultChart: React.FC<IHKResultChartProps> = (props) => {
	const {
		width,
		xaix_toal,
		xaix_daily,
		dailyConfirmedData,
		totalConfirmedData,
		totalHospitaliData,
	} = props
	const classes = useStyles()
	const { formatMessage: f } = useIntl()

	const unit = 'week'

	const confirmedDailyChartData = {
		labels: xaix_toal,
		datasets: [
			{
				label: f({ id: 'chart_title_confirmed' }),
				...getLineSetting(color.confirmed),
				data: totalConfirmedData,
			},
			{
				label: f({ id: 'chart_title_suspected' }),
				...getLineSetting(color.black),
				data: totalHospitaliData,
			},
		],
	}

	const confirmedDailyIncreaseChartData = {
		labels: xaix_daily,
		datasets: [
			{
				label: f({ id: 'chart_title_confirmed_daily_add' }),
				...getBarSetting(color.confirmed),
				data: dailyConfirmedData,
			},
		],
	}

	return (
		<div>
			<div className={classes.container}>
				<Bar
					data={confirmedDailyIncreaseChartData}
					legend={legend}
					options={createOption(true, 7, unit)}
				/>
				<Line
					data={confirmedDailyChartData}
					legend={legend}
					options={createOption(false, 50, unit)}
				/>
			</div>
		</div>
	)
}

const useStyles = makeStyles({
	container: {
		overflowX: 'scroll',
		margin: '20px 10px',
	},
})

export default withWidth()(React.memo(HKResultChart))
