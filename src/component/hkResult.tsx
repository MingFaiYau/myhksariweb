import React from 'react'
import CircleStatusView from './circleStatusView'
import { IconButton } from '@material-ui/core'
import { PersonPinOutlined, AssessmentOutlined } from '@material-ui/icons'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { Header, HKResultChart } from '.'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'
import { color, tool, size } from '../common'
import moment from 'moment'
import { fetchHKResult, fetchHKHistoryResult } from '../api'
import withWidth from '@material-ui/core/withWidth'

const onGoToConfirmedCasePress = () => {
	tool.onScrollToTablePress('overview_confirmed')
}

const onGoToMapPress = () => {
	tool.onScrollToTablePress('map')
}

interface HKResultProps {
	width: Breakpoint
}

const HKResult: React.FC<HKResultProps> = (props) => {
	const { width } = props
	const classes = useStyles()
	const { formatMessage: f } = useIntl()

	const [data, setData] = React.useState<ISARIHKResult | null>(null)
	const [dailyData, setDailyData] = React.useState<ISARIHKResult[] | null>(null)

	React.useEffect(() => {
		fetchHKResult().then((data) => {
			if (data?.features && data.features.length > 0) {
				const result = data.features[0]
				setData(result)
			} else {
				setData(null)
			}
		})
	}, [])

	React.useEffect(() => {
		fetchHKHistoryResult().then((data) => {
			if (data?.features && data.features.length > 0) {
				const result = data.features
				setDailyData(result)
			} else {
				setDailyData(null)
			}
		})
	}, [])

	if (!data || !dailyData) return <div />

	const updateDate = moment(data.attributes.As_of_date).format('YYYY-MM-DD HH:mm')

	// chart data
	let xaix_toal: string[] = []
	let totalConfirmedData: number[] = []
	let totalHospitaliData: number[] = []

	let xaix_daily: string[] = []
	let dailyConfirmedData: number[] = []

	let hasLatest = false
	const latestDate = moment(data.attributes.As_of_date).format('D/M/YYYY')

	for (const history of dailyData) {
		if (latestDate === history.attributes.As_of_date.toString()) {
			hasLatest = true
			totalConfirmedData.push(data.attributes.Number_of_confirmed_cases)
			totalHospitaliData.push(data.attributes.Number_of_cases_still_hospitali)
		} else {
			totalConfirmedData.push(history.attributes.Number_of_confirmed_cases)
			totalHospitaliData.push(history.attributes.Number_of_cases_still_hospitali)
		}

		xaix_toal.push(
			tool.convertToDate(
				history.attributes.As_of_date.toString(),
				'D/M/YYYY',
				'YYYY-MM-DD',
			),
		)
	}

	if (!hasLatest) {
		xaix_toal.push(moment(data.attributes.As_of_date).format('YYYY-MM-DD'))
		totalConfirmedData.push(data.attributes.Number_of_confirmed_cases)
		totalHospitaliData.push(data.attributes.Number_of_cases_still_hospitali)
	}

	let prevVal = 0
	totalConfirmedData.forEach((val, index) => {
		if (index === 0) {
			if (val !== 0) {
				dailyConfirmedData.push(val)
				xaix_daily.push(xaix_toal[index])
			}
		} else {
			if (prevVal !== 0 && val !== 0) {
				dailyConfirmedData.push(val - prevVal)
				xaix_daily.push(xaix_toal[index])
			}
		}
		if (val !== 0) prevVal = val
	})

	/*
	const displayDays = 0 // width === 'xs' ? 10 : width === 'sm' ? 30 : 0
	if (displayDays > 0) {
		xaix_toal = xaix_toal.slice(Math.max(xaix_toal.length - displayDays, 0))
		totalConfirmedData = totalConfirmedData.slice(
			Math.max(totalConfirmedData.length - displayDays, 0),
		)
		totalHospitaliData = totalHospitaliData.slice(
			Math.max(totalHospitaliData.length - displayDays, 0),
		)

		xaix_daily = xaix_daily.slice(Math.max(xaix_daily.length - displayDays, 0))
		dailyConfirmedData = dailyConfirmedData.slice(
			Math.max(dailyConfirmedData.length - displayDays, 0),
		)
	}
	*/
	const todayCases = dailyConfirmedData[dailyConfirmedData.length - 1]
	return (
		<>
			<Header id='overview' title={f({ id: 'slide_item_1' })} />
			<div className={classes.date}>{f({ id: 'date_statu_as' }, { date: updateDate })}</div>
			<div className={classes.firstDataView}>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<IconButton className={classes.btnGoDetail} onClick={onGoToConfirmedCasePress}>
						<AssessmentOutlined fontSize='large' />
					</IconButton>
					<div className={classes.txtConfirmed}>
						{tool.valueTo3Dig(data.attributes.Number_of_confirmed_cases)}
					</div>
					<IconButton className={classes.btnGoDetail} onClick={onGoToMapPress}>
						<PersonPinOutlined fontSize='large' />
					</IconButton>
				</div>
				{!!todayCases && (
					<div className={classes.txtConfirmedAdd}>{`( + ${todayCases} )`}</div>
				)}

				<div className={classes.txtConfirmedTitle}>{f({ id: 'status_confirmed' })}</div>
			</div>
			<div className={classes.secondDataView}>
				<CircleStatusView
					value={
						data.attributes.Number_of_confirmed_cases -
						data.attributes.Discharged -
						data.attributes.Death
					}
					title='status_hospitalised'
					titleColor={color.hospitalised}
				/>
				<CircleStatusView
					margin='0 20px'
					value={data.attributes.Discharged}
					title='status_discharged'
					titleColor={color.discharged}
				/>
				<CircleStatusView
					value={data.attributes.Death}
					title='status_deceased'
					titleColor={color.deceased}
				/>
			</div>
			<div className={classes.lastDataView}>
				<div className={classes.txtInvesting}>
					{tool.valueTo3Dig(data.attributes.Number_of_cases_still_hospitali)}
				</div>
				<div className={classes.txtInvestingTitle}>{f({ id: 'status_investigation' })}</div>
			</div>
			<HKResultChart
				xaix_toal={xaix_toal}
				xaix_daily={xaix_daily}
				dailyConfirmedData={dailyConfirmedData}
				totalConfirmedData={totalConfirmedData}
				totalHospitaliData={totalHospitaliData}
			/>
			<div className={classes.txtRef}>
				<a
					href='https://chp-dashboard.geodata.gov.hk/'
					target='_blank'
					rel='noopener noreferrer'
				>
					{f({ id: 'ref_hkresult' })}
				</a>
			</div>
			<div className={classes.disclaimer}>
				<p className={classes.txtDisclaimerTitle}>{f({ id: 'disclaimer_title' })}</p>
				<p className={classes.txtDisclaimerContent}>{f({ id: 'disclaimer_content' })}</p>
				<a
					href='mailto:hksecretsmanager@gmail.com'
					className={classes.txtDisclaimerContent}
				>
					{f({ id: 'disclaimer_email' })}
				</a>
			</div>
		</>
	)
}

const useStyles = makeStyles({
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
		position: 'relative',
	},
	txtConfirmed: {
		fontSize: 100,
		lineHeight: '90px',
		fontWeight: 'bold',
		textAlign: 'center',
		color: color.confirmed,
	},
	txtConfirmedAdd: {
		fontSize: 10,
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
	btnGoDetail: {
		color: color.confirmed,
		height: size.header * 1.5,
		width: size.header * 1.5,
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
		padding: '20px 10px 20px 10px',
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
		margin: '10px 10px 10px 10px',
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

export default withWidth()(React.memo(HKResult))
