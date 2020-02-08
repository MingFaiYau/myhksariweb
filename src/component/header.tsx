import React from 'react'
import { FormattedMessage } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import { color, size } from '../common'
/*
import { MenuRounded } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
	<IconButton color='primary' component='span'>
		<MenuRounded />
	</IconButton>
*/

interface IHeaderProps {
	onChangeLanguage: (locale: string) => void
}

const Header: React.FC<IHeaderProps> = (props) => {
	const { onChangeLanguage } = props
	const classes = useStyles()

	const onChangeLanguagePress = React.useCallback(() => {
		const currentLocale = localStorage.getItem('language')
		const nextLocale = currentLocale === 'zh' ? 'en' : 'zh'
		onChangeLanguage(nextLocale)
	}, [])

	const currentLocale = localStorage.getItem('language')
	const nextLocale = currentLocale === 'zh' ? 'ENG' : '中文'
	const languageRender = (
		<div className={classes.languageView} onClick={onChangeLanguagePress}>
			{nextLocale}
		</div>
	)
	return (
		<div className={classes.container}>
			<div className={classes.header} />
			<div className={classes.banner}>
				<div className={classes.bannerTriangle} />
				<div className={classes.bannerbody}>
					<span className={classes.txtBanner}>
						<FormattedMessage id='app_name' />
					</span>
				</div>
			</div>
			{languageRender}
		</div>
	)
}

const useStyles = makeStyles({
	container: {
		position: 'relative',
		height: size.header / 2 + size.banner,
	},
	header: {
		height: size.header,
		backgroundColor: color.header,
		display: 'flex',
		alignItems: 'center',
	},
	languageView: {
		position: 'absolute',
		right: 10,
		top: 0,
		height: `${size.header / 2}px`,
		lineHeight: `${size.header / 2}px`,
	},
	banner: {
		position: 'absolute',
		height: size.banner,
		width: '80%',
		top: size.header / 2,
		right: 0,
		backgroundColor: color.transparent,
	},
	bannerTriangle: {
		position: 'absolute',
		width: 0,
		height: 0,
		borderTop: `${size.banner / 2}px solid ${color.transparent}`,
		borderRight: `${size.banner / 3}px solid ${color.banner}`,
		borderBottom: `${size.banner / 2}px solid ${color.transparent}`,
	},
	bannerbody: {
		display: 'flex',
		height: size.banner,
		marginLeft: size.banner / 3,
		alignItems: 'center',
		backgroundColor: color.banner,
	},
	txtBanner: {
		marginLeft: 10,
		fontSize: 14,
		fontWeight: 'bold',
		color: color.black,
	},
})

export { Header }