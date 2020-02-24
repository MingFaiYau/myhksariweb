import React from 'react'
import { Bar } from 'react-chartjs-2'
import { color } from '../common'

const getBarSetting = (mainColor: string | string[]) => {
	return {
		backgroundColor: mainColor,
		borderColor: mainColor,
		borderWidth: 1,
		hoverBackgroundColor: mainColor,
		hoverBorderColor: mainColor,
	}
}

const createLegend = (showBox = true): Chart.ChartLegendOptions => {
	return {
		display: true,
		position: 'top',
		fullWidth: false,
		reverse: false,
		labels: {
			boxWidth: showBox ? 10 : 0,
			fontColor: 'rgb(0, 0, 0)',
			usePointStyle: true,
		},
		onClick: () => null,
	}
}

const createOption = (
	xIsTime: boolean,
	stepSize: number,
	showPercentage: boolean,
): Chart.ChartOptions => {
	let xAxes: any[] = []
	if (xIsTime) {
		xAxes = [
			{
				type: 'time',
				time: {
					unit: 'week',
					displayFormats: { week: 'MM/DD' },
				},
			},
		]
	}
	return {
		plugins: {
			datalabels: {
				color: color.black,
				anchor: 'end',
				align: 'top',
				display: true,
				font: {
					size: 12,
					weight: 'bold',
				},
				formatter: (_, data) => {
					if (data.dataset && data.dataset.data) {
						const dataset = data.dataset.data as number[]
						const myValue = dataset[data.dataIndex] as number
						if (myValue <= 0) return ''
						if (dataset.length < 5 && showPercentage) {
							const total = dataset.reduce((a: number, b: number) => a + b)
							return `${myValue} ( ${((myValue / total) * 100.0).toFixed(2)}% )`
						} else {
							return myValue
						}
					} else {
						return ''
					}
				},
			},
		},
		scales: {
			xAxes,
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

interface IBarChartProps {
	xaix: string[]
	datasets: IChartData[]
	xIsTime?: boolean
	stepSize?: number
	showPercentage?: boolean
	showBox?: boolean
}

const BarChart: React.FC<IBarChartProps> = (props) => {
	const {
		xaix,
		datasets,
		xIsTime = true,
		stepSize = 7,
		showPercentage = false,
		showBox = true,
	} = props

	const chartData: Chart.ChartData = {
		labels: xaix,
		datasets: [],
	}

	datasets.forEach((ds) => {
		chartData.datasets &&
			chartData.datasets.push({
				label: ds.label,
				...getBarSetting(ds.color),
				data: ds.data,
			})
	})

	return (
		<Bar
			data={chartData}
			legend={createLegend(showBox)}
			options={createOption(xIsTime, stepSize, showPercentage)}
		/>
	)
}

export default BarChart
