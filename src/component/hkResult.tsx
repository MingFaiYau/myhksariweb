import React from 'react'
import CircleStatusView from './circleStatusView'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'
import { color, tool, size } from '../common'
import moment from 'moment'
import { fetchHKResult } from '../api'
import { Header } from '.'

const onGoToConfirmedCasePress = () => {
	tool.onScrollToTablePress('overview_confirmed')
}

const HKResult: React.FC<{}> = () => {
	const classes = useStyles()
	const { formatMessage: f } = useIntl()

	const [data, setData] = React.useState<ISARIHKResult | null>(null)

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

	if (!data) return <div />

	const date = data
		? moment(data.attributes.As_of_date).format('YYYY-MM-DD HH:mm')
		: moment().format('YYYY-MM-DD HH:mm')

	return (
		<>
			<Header id='overview' title={f({ id: 'slide_item_1' })} />
			<div className={classes.date}>{f({ id: 'date_statu_as' }, { date })}</div>
			<div className={classes.firstDataView} onClick={onGoToConfirmedCasePress}>
				<div className={classes.txtConfirmed}>
					{tool.valueTo3Dig(data.attributes.Number_of_confirmed_cases)}
				</div>
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

export default React.memo(HKResult)
