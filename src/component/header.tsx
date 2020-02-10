import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { color, size } from '../common'

interface IHeaderProps {
	id: TElementId
	backgroundColor?: string
	headerType?: THeaderType

	title?: string
	titleBgColor?: string

	onChangeLanguage?: (locale: string) => void
}

const Header: React.FC<IHeaderProps> = (props) => {
	const {
		id,
		backgroundColor = color.header,
		headerType = 'Main',
		title,
		titleBgColor = color.banner,
		onChangeLanguage,
	} = props
	const classes = useStyles()

	const currentLocale = localStorage.getItem('language')
	const onChangeLanguagePress = React.useCallback(() => {
		const nextLanguage = currentLocale === 'zh' ? 'en' : 'zh'
		if (onChangeLanguage) {
			onChangeLanguage(nextLanguage)
		}
	}, [onChangeLanguage, currentLocale])

	let languageRender = null
	let bannerRender = null
	if (headerType === 'SlideMenu' && onChangeLanguage) {
		const nextLocale = currentLocale === 'zh' ? 'ENG' : '中文'
		languageRender = (
			<Button className={classes.languageView} onClick={onChangeLanguagePress}>
				{nextLocale}
			</Button>
		)
	}

	if (title) {
		bannerRender = (
			<div className={classes.banner}>
				<div
					className={classes.bannerTriangle}
					style={{ borderRightColor: titleBgColor }}
				/>
				<div className={classes.bannerbody} style={{ backgroundColor: titleBgColor }}>
					<span className={classes.txtBanner}>{title}</span>
				</div>
			</div>
		)
	}

	return (
		<div id={id} className={classes.container}>
			<div className={classes.header} style={{ backgroundColor }}>
				{languageRender}
			</div>
			{bannerRender}
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
		flexDirection: 'row-reverse',
	},
	languageView: {
		height: size.header,
		width: size.header,
	},
	banner: {
		position: 'absolute',
		height: size.banner,
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
		justifyContent: 'flex-end',
		backgroundColor: color.banner,
	},
	txtBanner: {
		marginRight: 10,
		marginLeft: 20,
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: 'end',
		color: color.black,
	},
})

export default React.memo(Header)
