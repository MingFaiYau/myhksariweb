import React from 'react'
import { Indicator } from '../component'
import { Grid } from '@material-ui/core'
import { fetchData } from '../api'

const MainPage: React.FC<{}> = () => {
	const [loading, setLoading] = React.useState<boolean>(true)
	React.useEffect(() => {
		fetchData().then((data) => {
			console.log(data)
			setLoading(false)
		})
	}, [])
	return (
		<div>
			<Grid container direction='column' justify='center' alignItems='center'>
				<Grid item md={12} sm={12} xs={12}>
					<span>total</span>
				</Grid>
			</Grid>
			<Indicator loading={loading} />
		</div>
	)
}

export { MainPage }
