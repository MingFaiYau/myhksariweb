import React from 'react'
import { Header } from '.'
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'
import { tool, color, size } from '../common'
import { fetchHKConfirmedData } from '../api'
import BarChart from './barChart'

interface IStatusMarkerProps {
	color: string
	title: string
	border?: boolean
}

const StatusMarker: React.FC<IStatusMarkerProps> = (props) => {
	const { color, title, border = false } = props
	const classes = useStyles()

	const statusStyle = border
		? { backgroundColor: color, border: `1px solid #000` }
		: { backgroundColor: color }
	return (
		<div className={classes.statusContainer}>
			<div className={classes.colStatus} style={statusStyle} />
			<span className={classes.txtStatus}>{title}</span>
		</div>
	)
}

/*
interface IOrderOption {
	value: string
	label: string
}

interface IOrderCondictionOption {
	value: string
	label: string
}

const orderItemOptions: IOrderOption[] = [
	{ value: 'case', label: 'case' },
	{ value: 'age', label: 'age' },
]

const orderCondictionOptions: IOrderCondictionOption[] = [
	{ value: 'desc', label: 'desc' },
	{ value: 'asc', label: 'asc' },
]
*/

const filterCondictionNoneOption = { value: 'none', label: '-' }

const ConfirmedListTable: React.FC<{}> = () => {
	/*
	const [orderItem, setOrderItem] = React.useState<IOrderOption>(orderItemOptions[0])
	const [orderCondiction, setOrderCondiction] = React.useState<IOrderCondictionOption>(
		orderCondictionOptions[0],
	)
	*/
	const [filterOptions, setFilterOptions] = React.useState<IFilterOption[]>([])
	const [filterItem, setFilterItem] = React.useState<IFilterOption>(
		filterCondictionNoneOption as IFilterOption,
	)
	const [filterCondiction, setFilterCondiction] = React.useState<IFilterCondictionOption>(
		filterCondictionNoneOption as IFilterCondictionOption,
	)
	const [filterCondictionItem, setFilterCondictionItem] = React.useState<
		IFilterCondictionItemOption
	>(filterCondictionNoneOption)

	const classes = useStyles()
	const { formatMessage: f } = useIntl()
	const currentLocale = localStorage.getItem('language')

	const [data, setData] = React.useState<ISARIConfirmedCase[] | null>(null)

	React.useEffect(() => {
		fetchHKConfirmedData().then((data) => {
			if (data?.features && data.features.length > 0) {
				const hospitals: string[] = []
				const residents: string[] = []
				const genders: string[] = []
				const status: string[] = []

				for (const item of data.features) {
					const hospitals_field =
						currentLocale === 'en' ? 'Name_of_hospital_admitted' : '入住醫院名稱'
					const field_resident =
						currentLocale === 'en' ? 'HK_Non_HK_resident' : '香港_非香港居民'
					const field_gender = currentLocale === 'en' ? 'Gender' : '性別'
					const field_status =
						currentLocale === 'en'
							? 'Hospitalised_Discharged_Decease'
							: '住院_出院_死亡'

					if (!hospitals.includes(item.attributes[hospitals_field])) {
						hospitals.push(item.attributes[hospitals_field])
					}

					if (!residents.includes(item.attributes[field_resident])) {
						residents.push(item.attributes[field_resident])
					}

					if (!genders.includes(item.attributes[field_gender])) {
						genders.push(item.attributes[field_gender])
					}

					if (!status.includes(item.attributes[field_status])) {
						status.push(item.attributes[field_status])
					}
				}

				const hospital_options: IFilterCondictionItemOption[] = hospitals.map(
					(hospital) => {
						return { value: hospital, label: hospital }
					},
				)

				const resident_options: IFilterCondictionItemOption[] = residents.map(
					(resident) => {
						return { value: resident, label: resident }
					},
				)

				const gender_options: IFilterCondictionItemOption[] = genders.map((gender) => {
					return { value: gender, label: gender }
				})

				const status_options: IFilterCondictionItemOption[] = status.map((status) => {
					return { value: status, label: status }
				})

				const options: IFilterOption[] = [
					{
						value: 'none',
						label: '-',
						condictions: [filterCondictionNoneOption as IFilterCondictionOption],
						condictionItems: [filterCondictionNoneOption],
					},
					{
						value: 'status',
						label: f({ id: 'filter_status' }),
						condictions: [{ value: 'equal', label: '=' }],
						condictionItems: status_options,
					},
					{
						value: 'gender',
						label: f({ id: 'filter_gender' }),
						condictions: [{ value: 'equal', label: '=' }],
						condictionItems: gender_options,
					},
					{
						value: 'case',
						label: f({ id: 'filter_case' }),
						condictions: [{ value: 'equal', label: '=' }],
						condictionItems: [
							{ value: 'local', label: f({ id: 'filter_case_local' }) },
							{ value: 'import', label: f({ id: 'filter_case_imported' }) },
						],
					},

					{
						value: 'resident',
						label: f({ id: 'filter_resident' }),
						condictions: [{ value: 'equal', label: '=' }],
						condictionItems: resident_options,
					},
					{
						value: 'hospital',
						label: f({ id: 'filter_hospital' }),
						condictions: [{ value: 'equal', label: '=' }],
						condictionItems: hospital_options,
					},
				]

				setFilterOptions(options)
				setFilterItem(options[0])
				setFilterCondiction(options[0].condictions[0])
				setFilterCondictionItem(options[0].condictionItems[0])
				setData(data.features)
			} else {
				setData(null)
			}
		})
	}, [])

	if (!data) return null

	data.sort((a, b) => {
		if (a.attributes.Case_no_ > b.attributes.Case_no_) return -1
		else return 0
	})
	/*
	if (orderItem.value === 'case' || orderItem.value === 'age') {
		const field = orderItem.value === 'case' ? 'Case_no_' : 'Age'
		data.sort((a, b) => {
			if (orderCondiction.label === 'desc') {
				if (a.attributes[field] > b.attributes[field]) return -1
				else return 0
			} else {
				if (a.attributes[field] < b.attributes[field]) return -1
				else return 0
			}
		})
	}
	*/

	let xaix: string[] = []
	let chartData: number[] = []
	let barChartColor: string[] = []

	// filter
	let filteredData = data
	if (filterItem.value === 'case') {
		const local = data.filter((val) => {
			return val.attributes.Case_classification !== 'Imported'
		})

		const imported = data.filter((val) => {
			return val.attributes.Case_classification === 'Imported'
		})

		xaix = [f({ id: 'filter_case_local' }), f({ id: 'filter_case_imported' })]
		chartData = [local.length, imported.length]
		barChartColor =
			filterCondictionItem.value === 'local'
				? [color.chart_selected, color.chart_data]
				: [color.chart_data, color.chart_selected]
		filteredData = filterCondictionItem.value === 'local' ? local : imported
	} else if (filterItem.value === 'hospital') {
		const hospitals: any = {}
		filteredData = data.filter((val) => {
			const field = currentLocale === 'en' ? 'Name_of_hospital_admitted' : '入住醫院名稱'
			if (hospitals[val.attributes[field]]) {
				hospitals[val.attributes[field]] = hospitals[val.attributes[field]] + 1
			} else {
				hospitals[val.attributes[field]] = 1
			}
			return val.attributes[field] === filterCondictionItem.label
		})

		for (const key of Object.keys(hospitals)) {
			xaix.push(key.replace('醫院', '').replace('Hospital', ''))
			chartData.push(hospitals[key])
			if (key === filterCondictionItem.label) {
				barChartColor.push(color.chart_selected)
			} else {
				barChartColor.push(color.chart_data)
			}
		}
	} else if (filterItem.value === 'resident') {
		const residents: any = {}
		filteredData = data.filter((val) => {
			const field = currentLocale === 'en' ? 'HK_Non_HK_resident' : '香港_非香港居民'
			if (residents[val.attributes[field]]) {
				residents[val.attributes[field]] = residents[val.attributes[field]] + 1
			} else {
				residents[val.attributes[field]] = 1
			}
			return val.attributes[field] === filterCondictionItem.label
		})

		for (const key of Object.keys(residents)) {
			xaix.push(key)
			chartData.push(residents[key])
			if (key === filterCondictionItem.label) {
				barChartColor.push(color.chart_selected)
			} else {
				barChartColor.push(color.chart_data)
			}
		}
	} else if (filterItem.value === 'gender') {
		const genders: any = {}
		filteredData = data.filter((val) => {
			const field = currentLocale === 'en' ? 'Gender' : '性別'
			if (genders[val.attributes[field]]) {
				genders[val.attributes[field]] = genders[val.attributes[field]] + 1
			} else {
				genders[val.attributes[field]] = 1
			}
			return val.attributes[field] === filterCondictionItem.label
		})

		for (const key of Object.keys(genders)) {
			xaix.push(key)
			chartData.push(genders[key])
			if (key === filterCondictionItem.label) {
				barChartColor.push(color.chart_selected)
			} else {
				barChartColor.push(color.chart_data)
			}
		}
	} else if (filterItem.value === 'status') {
		const status: any = {}
		filteredData = data.filter((val) => {
			const field =
				currentLocale === 'en' ? 'Hospitalised_Discharged_Decease' : '住院_出院_死亡'
			if (status[val.attributes[field]]) {
				status[val.attributes[field]] = status[val.attributes[field]] + 1
			} else {
				status[val.attributes[field]] = 1
			}
			return val.attributes[field] === filterCondictionItem.label
		})

		for (const key of Object.keys(status)) {
			xaix.push(key)
			chartData.push(status[key])
			if (key === filterCondictionItem.label) {
				barChartColor.push(color.chart_selected)
			} else {
				barChartColor.push(color.chart_data)
			}
		}
	}

	const dataset_daily: IChartData[] | null =
		xaix.length > 0
			? [
					{
						label: filterItem.label,
						color: barChartColor,
						data: chartData,
					},
			  ]
			: null

	return (
		<div>
			<Header
				id='overview_confirmed'
				headerType='Confirmed'
				title={f({ id: 'slide_item_2' })}
				titleBgColor={color.confirmed}
			/>
			<div className={classes.date}>{f({ id: 'date_statu_as_gov' })}</div>
			<div className={classes.statusView}>
				<div className={classes.statusSubView}>
					<StatusMarker
						color={color.local_case}
						title={f({ id: 'local_case' })}
						border={true}
					/>
					<StatusMarker
						color={color.import_case}
						title={f({ id: 'import_case' })}
						border={true}
					/>
				</div>
				<div className={classes.statusSubView}>
					<StatusMarker color={color.bg_deceased} title={f({ id: 'status_deceased' })} />
					<StatusMarker
						color={color.bg_discharged}
						title={f({ id: 'status_discharged' })}
					/>
				</div>
			</div>
			{/*
			<div className={classes.orderView}>
				<Select
					isSearchable={false}
					className={classes.orderItem}
					options={orderItemOptions}
					defaultValue={orderItem}
					onChange={(option) => {
						setOrderItem(option as IOrderOption)
						console.log('onChange', option)
					}}
				/>
				<Select
					isSearchable={false}
					className={classes.orderCondication}
					options={orderCondictionOptions}
					defaultValue={orderCondiction}
					onChange={(option) => {
						setOrderCondiction(option as IOrderCondictionOption)
					}}
				/>
			</div>
			*/}
			<div className={classes.filterView}>
				<Select
					isSearchable={false}
					className={classes.filterItem}
					options={filterOptions}
					defaultValue={filterItem}
					onChange={(option) => {
						const opt = option as IFilterOption
						setFilterItem(opt)
						setFilterCondiction(opt.condictions[0])
						setFilterCondictionItem(opt.condictionItems[0])
					}}
				/>
				<Select
					isSearchable={false}
					className={classes.filterCondicationItem}
					options={filterItem.condictionItems}
					defaultValue={filterCondictionItem}
					value={filterCondictionItem}
					onChange={(option) => {
						setFilterCondictionItem(option as IFilterCondictionItemOption)
					}}
				/>
			</div>
			{!!dataset_daily && (
				<div style={{ margin: 10 }}>
					<BarChart
						xaix={xaix}
						datasets={dataset_daily}
						xIsTime={false}
						showPercentage={true}
					/>
				</div>
			)}

			<table className={classes.container}>
				<thead>
					<tr className={classes.tableRow}>
						<th className={classes.headerCell} style={{ width: '25%' }} align='center'>
							{f({ id: 'th_confirmed_case' })}
						</th>
						<th className={classes.headerCell} style={{ width: '15%' }} align='center'>
							{f({ id: 'th_confirmed_onset' })}
						</th>
						<th className={classes.headerCell} style={{ width: '15%' }} align='center'>
							{f({ id: 'th_confirmed_confirmation' })}
						</th>
						<th className={classes.headerCell} align='center' />
					</tr>
				</thead>
				<tbody>
					{filteredData.map((value) => {
						const status = value.attributes.Hospitalised_Discharged_Decease.trim()
						const bgColor =
							status === 'Hospitalised'
								? color.white
								: status === 'Deceased'
								? color.bg_deceased
								: color.bg_discharged
						const gender =
							currentLocale === 'en' ? value.attributes.Gender : value.attributes.性別
						const hospital =
							currentLocale === 'en'
								? value.attributes.Name_of_hospital_admitted
								: value.attributes.入住醫院名稱
						const classify =
							currentLocale === 'en'
								? value.attributes.Case_classification
								: value.attributes.個案分類
						const countColor =
							value.attributes.Case_classification === 'Imported'
								? color.import_case
								: color.local_case
						return (
							<tr
								key={value.attributes.ObjectId}
								className={classes.tableRow}
								style={{ backgroundColor: bgColor }}
							>
								<td className={classes.constCell} align='center'>
									<span
										className={classes.count}
										style={{ backgroundColor: countColor }}
									>
										{tool.valueTo3Dig(value.attributes.個案編號)}
									</span>
									<span>{`${gender} ${value.attributes.年齡}`}</span>
								</td>
								<td className={classes.caseCell} align='center'>
									{tool.convertToDate(value.attributes.發病日期)}
								</td>
								<td className={classes.caseCell} align='center'>
									{tool.convertToDate(value.attributes.實驗室確診報告日期)}
								</td>
								<td className={classes.caseCell} align='center'>
									{hospital}
									<br />
									{classify}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
	},
	date: {
		margin: 10,
		fontSize: size.font_date,
		fontWeight: 'bold',
		textAlign: 'end',
	},
	statusView: {
		display: 'flex',
		flexDirection: 'row',
	},
	statusSubView: {
		display: 'flex',
		margin: 5,
		flexDirection: 'column',
	},
	statusContainer: {
		display: 'flex',
		margin: 5,
		alignItems: 'center',
	},
	colStatus: {
		height: 14,
		width: 14,
		backgroundColor: color.local_case,
		marginRight: 5,
	},
	txtStatus: {
		marginRight: 20,
		fontSize: 14,
		fontWeight: 'bold',
	},
	tableRow: {
		borderBottom: `1px solid ${color.black}`,
	},
	headerCell: {
		background: color.header,
		padding: '10px 5px',
	},
	caseCell: {
		padding: '5px 5px',
	},
	constCell: {
		padding: '5px 5px',
	},
	count: {
		lineHeight: '20px',
		border: `1px solid ${color.black}`,
		padding: '2px 5px',
		marginRight: 10,
		fontSize: 10,
	},
	// order
	orderView: {
		display: 'flex',
		flexDirection: 'row',
		margin: '5px 10px',
	},
	orderItem: {
		width: 150,
	},
	orderCondication: {
		marginLeft: 5,
		width: 150,
	},
	// filter
	filterView: {
		display: 'flex',
		flexDirection: 'row',
		margin: '5px 10px',
	},
	filterItem: {
		flex: 1,
	},
	filterCondication: {
		marginLeft: 5,
		marginRight: 5,
		width: 80,
	},
	filterCondicationItem: {
		marginLeft: 5,
		flex: 1,
	},
}))

export default React.memo(ConfirmedListTable)
