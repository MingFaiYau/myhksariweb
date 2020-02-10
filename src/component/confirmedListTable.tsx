import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tool, color } from '../common'
import { FormattedMessage } from 'react-intl'

interface IConfirmedListTableProps {
	data: ISARIConfirmedCase[] | null
}

const ConfirmedListTable: React.FC<IConfirmedListTableProps> = (props) => {
	const { data } = props
	const classes = useStyles()
	const currentLocale = localStorage.getItem('language')

	if (!data) return null
	return (
		<div>
			<div className={classes.date}>
				<FormattedMessage id='date_statu_as_gov' />
			</div>
			<div className={classes.statusView}>
				<div className={classes.colDeceased} />
				<span className={classes.txtDeceased}>
					<FormattedMessage id='status_deceased' />
				</span>
				<div className={classes.colDischarged} />
				<div className={classes.txtDischarged}>
					<FormattedMessage id='status_discharged' />
				</div>
			</div>
			<table className={classes.container}>
				<thead>
					<tr className={classes.tableRow}>
						<th className={classes.headerCell} style={{ width: '25%' }} align='center'>
							<FormattedMessage id='th_confirmed_case' />
						</th>
						<th className={classes.headerCell} style={{ width: '15%' }} align='center'>
							<FormattedMessage id='th_confirmed_onset' />
						</th>
						<th className={classes.headerCell} style={{ width: '15%' }} align='center'>
							<FormattedMessage id='th_confirmed_confirmation' />
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
						return (
							<tr
								key={value.attributes.ObjectId}
								className={classes.tableRow}
								style={{ backgroundColor: bgColor }}
							>
								<td className={classes.constCell} align='center'>
									<span className={classes.count}>
										{tool.valueTo3Dig(value.attributes.個案編號)}
									</span>
									<span>{`${gender} ${value.attributes.年齡}`}</span>
								</td>
								<td className={classes.caseCell} align='center'>
									{tool.convertDate(value.attributes.發病日期)}
								</td>
								<td className={classes.caseCell} align='center'>
									{tool.convertDate(value.attributes.實驗室確診報告日期)}
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
		fontWeight: 'bold',
		textAlign: 'end',
	},
	statusView: {
		display: 'flex',
		margin: '5px 10px 10px 10px',
		alignItems: 'center',
	},
	colDeceased: {
		height: 14,
		width: 14,
		backgroundColor: color.bg_deceased,
		marginRight: 5,
	},
	txtDeceased: {
		marginRight: 20,
		fontSize: 14,
		fontWeight: 'bold',
	},
	colDischarged: {
		height: 14,
		width: 14,
		backgroundColor: color.bg_discharged,
		marginRight: 5,
	},
	txtDischarged: {
		marginRight: 5,
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
