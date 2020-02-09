import React from 'react'
import { Grid } from '@material-ui/core'
import { Indicator, Header, ConfirmedListTable, SariResultView } from '../component'
import { fetchData, fetchConfirmedData } from '../api'
import moment from 'moment'

interface IMainPageProps {
	onChangeLanguage: (locale: string) => void
}

const MainPage: React.FC<IMainPageProps> = (props) => {
	const { onChangeLanguage } = props
	const [loading, setLoading] = React.useState<boolean>(true)
	const [sariResult, setSariResult] = React.useState<ISARIResult | null>(null)
	const [confirmedData, setConfirmedData] = React.useState<ISARIConfirmedCase[] | null>(null)

	React.useEffect(() => {
		fetchData().then((data) => {
			if (data?.features && data.features.length > 0) {
				const result = data.features[0]
				setSariResult(result)
			} else {
				setSariResult(null)
			}

			fetchConfirmedData().then((data) => {
				if (data?.features && data.features.length > 0) {
					setConfirmedData(data.features)
				} else {
					setConfirmedData(null)
				}
				setLoading(false)
			})
		})
	}, [])

	const date = sariResult
		? moment(sariResult.attributes.As_of_date).format('YYYY-MM-DD HH:mm')
		: moment().format('YYYY-MM-DD HH:mm')

	return (
		<div>
			<Header onChangeLanguage={onChangeLanguage} date={date} />
			<Grid container>
				<Grid item xs={12} md={6}>
					<SariResultView data={sariResult} />
				</Grid>
				<Grid item xs={12} md={6}>
					<ConfirmedListTable data={confirmedData} />
				</Grid>
			</Grid>
			<Indicator loading={loading} />
		</div>
	)
}

export { MainPage }
