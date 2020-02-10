import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const GoogleMap: React.FC<{}> = () => {
	const classes = useStyles()
	return (
		<div className={classes.container}>
			<iframe
				src='https://www.google.com/maps/d/u/0/embed?mid=1go2i_3R5N9siCA-flykorzBFi8qDccbZ'
				width='100%'
				height='100%'
			/>
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
