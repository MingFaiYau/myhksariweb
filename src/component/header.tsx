import React from 'react'
import { FormattedMessage } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import { color, size } from '../common'

interface IHeaderProps {
	id: string
	headerType?: headerType
	title: string
	titleBgColor?: string
	date?: string
	onChangeLanguage?: (locale: string) => void
}

const Header: React.FC<IHeaderProps> = (props) => {
	const {
		id,
		headerType = 'Main',
		title,
		titleBgColor = color.banner,
		date,
		onChangeLanguage,
	} = props
	const classes = useStyles()
	const currentLocale = localStorage.getItem('language')

	const onChangeLanguagePress = React.useCallback(() => {
		const nextLocale = currentLocale === 'zh' ? 'en' : 'zh'
		if (onChangeLanguage) {
			onChangeLanguage(nextLocale)
		}
	}, [onChangeLanguage, currentLocale])

	const nextLocale = currentLocale === 'zh' ? 'ENG' : '中文'
	const languageRender = onChangeLanguage ? (
		<div className={classes.languageView} onClick={onChangeLanguagePress}>
			{nextLocale}
		</div>
	) : null

	let dateRender = null
	if (headerType === 'Confirmed') {
		dateRender = (
			<div className={classes.statusView}>
				<div className={classes.colDeceased} />
				<span className={classes.txtDeceased}>
					<FormattedMessage id='status_deceased' />
				</span>
				<div className={classes.colDischarged} />
				<div className={classes.txtDischarged}>
					<FormattedMessage id='status_discharged' />
				</div>
			</div>
		)
	} else if (headerType === 'Main' && date) {
		dateRender = (
			<div className={classes.dateView}>
				<div className={classes.txtDate}>
					<FormattedMessage id='date_statu_as' values={{ date }} />
				</div>
			</div>
		)
	}

	return (
		<div id={id}>
			<div className={classes.container}>
				<div className={classes.header} />
				<div className={classes.banner}>
					<div
						className={classes.bannerTriangle}
						style={{ borderRightColor: titleBgColor }}
					/>
					<div className={classes.bannerbody} style={{ backgroundColor: titleBgColor }}>
						<span className={classes.txtBanner}>
							<FormattedMessage id={title} />
						</span>
					</div>
				</div>
				{languageRender}
			</div>
			{dateRender}
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
	dateView: {
		height: 25,
		display: 'flex',
		margin: '5px 10px 5px 10px',
		justifyContent: 'flex-end',
	},
	txtDate: {
		marginRight: 5,
		fontSize: 14,
		fontWeight: 'bold',
	},
	statusView: {
		height: 25,
		display: 'flex',
		margin: '5px 10px 5px 10px',
		alignItems: 'center',
	},
	colDeceased: {
		height: 14,
		width: 14,
		backgroundColor: color.bg_deceased,
		marginRight: 5,
	},
	txtDeceased: {
		marginRight: 20,
		fontSize: 14,
		fontWeight: 'bold',
	},
	colDischarged: {
		height: 14,
		width: 14,
		backgroundColor: color.bg_discharged,
		marginRight: 5,
	},
	txtDischarged: {
		marginRight: 5,
		fontSize: 14,
		fontWeight: 'bold',
	},
})

export default React.memo(Header)
