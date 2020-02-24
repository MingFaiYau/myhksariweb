import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'
import { color } from '../common'
import withWidth from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import LineChart from './lineChart'
import BarChart from './barChart'

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

	const dataset_daily: IChartData[] = [
		{
			label: f({ id: 'chart_title_confirmed_daily_add' }),
			color: color.confirmed,
			data: dailyConfirmedData,
		},
	]
	const datasets_total: IChartData[] = [
		{
			label: f({ id: 'chart_title_confirmed' }),
			color: color.confirmed,
			data: totalConfirmedData,
		},
		{
			label: f({ id: 'chart_title_suspected' }),
			color: color.black,
			data: totalHospitaliData,
		},
	]

	return (
		<div>
			<div className={classes.container}>
				<BarChart xaix={xaix_daily} datasets={dataset_daily} />
				<LineChart xaix={xaix_toal} datasets={datasets_total} />
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
