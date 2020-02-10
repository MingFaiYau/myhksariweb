import React from 'react'
import GoogleMapReact from 'google-map-react'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'

const AnyReactComponent: React.FC<{ text: string; lat: number; lng: number }> = ({ text }) => (
	<div>{text}</div>
)

const GoogleMap: React.FC<{}> = () => {
	const classes = useStyles()
	const { formatMessage: f } = useIntl()

	return (
		<div className={classes.container}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyD-B4Ux0gkExvEx0985jmlE35E-LWNbL1o' }}
				defaultCenter={{ lat: 22.28552, lng: 114.15769 }}
				defaultZoom={11}
			>
				<AnyReactComponent text='hi' lat={22.28552} lng={114.15769} />
			</GoogleMapReact>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: 20,
		width: '100%',
		height: '100vh',
	},
}))

export default React.memo(GoogleMap)
