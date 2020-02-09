import React from 'react'
import { FormattedMessage } from 'react-intl'
import CircleStatusView from './circleStatusView'
import { makeStyles } from '@material-ui/core/styles'
import { color, tool } from '../common'

interface ISariResultViewProps {
	data: ISARIResult | null
}

const SariResultView: React.FC<ISariResultViewProps> = (props) => {
	const { data } = props
	const classes = useStyles()

	if (!data) return <div />
	return (
		<>
			<div className={classes.firstDataView}>
				<div className={classes.txtConfirmed}>
					{tool.valueTo3Dig(data.attributes.Number_of_confirmed_cases)}
				</div>
				<div className={classes.txtConfirmedTitle}>
					<FormattedMessage id='title_confirmed_cases' />
				</div>
			</div>
			<div className={classes.secondDataView}>
				<CircleStatusView
					value={
						data.attributes.Number_of_confirmed_cases -
						data.attributes.Discharged -
						data.attributes.Death
					}
					title='title_hospitalised'
					titleColor={color.txtInHospital}
				/>
				<CircleStatusView
					margin='0 20px'
					value={data.attributes.Discharged}
					title='title_discharged'
					titleColor={color.txtDischarged}
				/>
				<CircleStatusView
					value={data.attributes.Death}
					title='title_death'
					titleColor={color.txtDead}
				/>
			</div>
			<div className={classes.lastDataView}>
				<div className={classes.txtInvesting}>
					{tool.valueTo3Dig(data.attributes.Number_of_cases_still_hospitali)}
				</div>
				<div className={classes.txtInvestingTitle}>
					<FormattedMessage id='title_investigation' />
				</div>
			</div>
			<div className={classes.txtRef}>
				<FormattedMessage id='ref' />
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
		color: color.txtConfirmed,
	},
	txtConfirmedTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: color.txtConfirmed,
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
		marginTop: 5,
		marginLeft: 10,
		fontSize: 12,
		color: color.black,
	},
})

export default React.memo(SariResultView)
