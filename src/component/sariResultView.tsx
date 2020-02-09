import React from 'react'
import { FormattedMessage } from 'react-intl'
import CircleStatusView from './circleStatusView'
import { makeStyles } from '@material-ui/core/styles'
import { color, tool } from '../common'

const onScrollToTablePress = () => {
	const table = window.document.getElementById('confirmed_table')
	table && window.scrollTo(0, table.offsetTop)
}

interface ISariResultViewProps {
	data: ISARIResult | null
}

const SariResultView: React.FC<ISariResultViewProps> = (props) => {
	const { data } = props
	const classes = useStyles()

	if (!data) return <div />
	return (
		<>
			<div className={classes.firstDataView} onClick={onScrollToTablePress}>
				<div className={classes.txtConfirmed}>
					{tool.valueTo3Dig(data.attributes.Number_of_confirmed_cases)}
				</div>
				<div className={classes.txtConfirmedTitle}>
					<FormattedMessage id='status_confirmed' />
				</div>
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
				<div className={classes.txtInvestingTitle}>
					<FormattedMessage id='status_investigation' />
				</div>
			</div>
			<div className={classes.txtRef}>
				<FormattedMessage id='ref' />
			</div>
			<div className={classes.disclaimer}>
				<span className={classes.txtDisclaimerTitle}>
					<FormattedMessage id='disclaimer_title' />
				</span>
				<br />
				<span className={classes.txtDisclaimerContent}>
					<FormattedMessage id='disclaimer_content' />
				</span>
			</div>
		</>
	)
}

const useStyles = makeStyles({
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
		margin: '20px 10px',
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

export default React.memo(SariResultView)
