import React from 'react'
import { Line } from 'react-chartjs-2'
import { color } from '../common'

const getLineSetting = (mainColor: string | string[]) => {
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
	onClick: () => null,
}

const createOption = (stepSize: number): Chart.ChartOptions => {
	return {
		plugins: {
			datalabels: {
				display: false,
			},
		},
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

interface ILineChartProps {
	xaix: string[]
	datasets: IChartData[]
	stepSize?: number
}

const LineChart: React.FC<ILineChartProps> = (props) => {
	const { xaix, datasets, stepSize = 50 } = props

	const chartData: Chart.ChartData = {
		labels: xaix,
		datasets: [],
	}

	datasets.forEach((ds) => {
		chartData.datasets &&
			chartData.datasets.push({
				label: ds.label,
				...getLineSetting(ds.color),
				data: ds.data,
			})
	})

	return <Line data={chartData} legend={legend} options={createOption(stepSize)} />
}

export default LineChart
