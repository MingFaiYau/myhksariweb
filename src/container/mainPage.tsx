import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Indicator, CircleStatusView, Header } from '../component'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { fetchData } from '../api'
import { color, tool } from '../common'

interface IMainPageProps {
	onChangeLanguage: (locale: string) => void
}

const MainPage: React.FC<IMainPageProps> = (props) => {
	const { onChangeLanguage } = props
	const [loading, setLoading] = React.useState<boolean>(true)
	const [sariResult, setSariResult] = React.useState<ISARIResult | null>(null)
	const [confirmedData, setConfirmedData] = React.useState<any>(null)
	const [isOpenConfirmedListModel, setIsOpenConfirmedListModel] = React.useState<boolean>(false)
	const classes = useStyles()

	React.useEffect(() => {
		fetchData().then((data) => {
			if (data?.features && data.features.length > 0) {
				const result = data.features[0].attributes
				setSariResult(result)
			} else {
				setSariResult(null)
			}
			setLoading(false)
		})
	}, [])
	/*
	const onOpenConfirmedListModelPress = React.useCallback(() => {
		fetchConfirmedData().then((data) => {
			console.log('fetchConfirmedData', data)

			if (data?.features && data.features.length > 0) {
				setConfirmedData(data)
			} else {
				setConfirmedData(null)
			}
			setLoading(false)
			setIsOpenConfirmedListModel(true)
		})
	}, [])

	const onCloseConfirmedListModelPress = React.useCallback(() => {
		setIsOpenConfirmedListModel(false)
	}, [])
	*/
	const content = sariResult ? (
		<div>
			<Header onChangeLanguage={onChangeLanguage} />
			<div className={classes.dateView}>
				<span className={classes.txtDate}>
					<FormattedMessage
						id='date_statu_as'
						values={{
							date: moment(sariResult.As_of_date).format('YYYY-MM-DD HH:mm'),
						}}
					/>
				</span>
			</div>
			<div className={classes.firstDataView}>
				<div className={classes.txtConfirmed}>
					{tool.valueTo3Dig(sariResult.Number_of_confirmed_cases)}
				</div>
				<div className={classes.txtConfirmedTitle}>
					<FormattedMessage id='title_confirmed_cases' />
				</div>
			</div>
			<div className={classes.secondDataView}>
				<CircleStatusView
					value={
						sariResult.Number_of_confirmed_cases -
						sariResult.Discharged -
						sariResult.Death
					}
					title='title_hospitalised'
					titleColor={color.txtInHospital}
				/>
				<CircleStatusView
					margin='0 20px'
					value={sariResult.Discharged}
					title='title_discharged'
					titleColor={color.txtDischarged}
				/>
				<CircleStatusView
					value={sariResult.Death}
					title='title_death'
					titleColor={color.txtDead}
				/>
			</div>
			<div className={classes.lastDataView}>
				<div className={classes.txtInvesting}>
					{tool.valueTo3Dig(sariResult.Number_of_cases_still_hospitali)}
				</div>
				<div className={classes.txtInvestingTitle}>
					<FormattedMessage id='title_investigation' />
				</div>
			</div>
			<div className={classes.txtRef}>
				<FormattedMessage id='ref' />
			</div>
		</div>
	) : null
	return (
		<div>
			{content}
			<Indicator loading={loading} />
		</div>
	)
}

const useStyles = makeStyles({
	dateView: {
		display: 'flex',
		margin: '5px 10px 5px 0px',
		justifyContent: 'flex-end',
	},
	txtDate: {
		fontSize: 14,
		fontWeight: 'bold',
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

export { MainPage }
