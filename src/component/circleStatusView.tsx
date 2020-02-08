import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { makeStyles } from '@material-ui/core/styles'
import { color, size, tool } from '../common'
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth'

interface ICircleStatusViewProps {
	width: Breakpoint
	margin?: string
	value: number
	title: string
	titleColor: string
}

const CircleStatusView: React.FC<ICircleStatusViewProps> = (props) => {
	const { width, margin = '0', value, title, titleColor } = props
	const classes = useStyles()

	let circleSize = '100px'
	if (width === 'xs') {
		circleSize = 'calc( ( 100vw - 60px ) / 3 )'
	} else {
		circleSize = `${(600 * 0.8) / 3}px`
	}

	const circleStyle = {
		height: circleSize,
		width: circleSize,
		borderRadius: circleSize,
	}

	return (
		<div className={classes.container} style={{ margin: margin }}>
			<div className={classes.circle} style={circleStyle}>
				<div className={classes.txtValue} style={{ color: titleColor }}>
					{tool.valueTo3Dig(value)}
				</div>
			</div>
			<div className={classes.txtTitle} style={{ color: titleColor }}>
				<FormattedMessage id={title} />
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		justifyItems: 'center',
		alignItems: 'center',
	},
	circle: {
		display: 'flex',
		background: color.circle,
		justifyContent: 'center',
		justifyItems: 'center',
		alignItems: 'center',
	},
	txtValue: {
		fontSize: '30px',
		fontWeight: 'bold',
	},
	txtTitle: {
		marginTop: 10,
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
	},
}))

export default withWidth()(React.memo(CircleStatusView))
