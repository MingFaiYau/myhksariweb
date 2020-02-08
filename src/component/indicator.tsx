import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { color } from '../common'

interface IndicatorProps {
	loading: boolean
}

const Indicator: React.FC<IndicatorProps> = (props) => {
	const { loading } = props
	const classes = useStyles()
	
	if (!loading) return null
	return (
		<div className={classes.container}>
			<CircularProgress className={classes.progress} />
		</div>
	)
}

const useStyles = makeStyles({
	container: {
		top: 0,
		left: 0,
		position: 'fixed',
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	progress: {
		height: 100,
		width: 100,
		color: color.indicator,
	},
})

export { Indicator }
