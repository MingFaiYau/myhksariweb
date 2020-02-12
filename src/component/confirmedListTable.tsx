import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'
import { tool, color, size } from '../common'
import { Header } from '.'
import { fetchHKConfirmedData } from '../api'

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

const ConfirmedListTable: React.FC<{}> = (props) => {
	const classes = useStyles()
	const { formatMessage: f } = useIntl()
	const currentLocale = localStorage.getItem('language')

	const [data, setData] = React.useState<ISARIConfirmedCase[] | null>(null)

	React.useEffect(() => {
		fetchHKConfirmedData().then((data) => {
			if (data?.features && data.features.length > 0) {
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
					{data?.map((value) => {
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
}))

export default React.memo(ConfirmedListTable)
