import React from 'react'
import { Grid, Hidden, Drawer, IconButton } from '@material-ui/core'
import { ListAltRounded, VerticalAlignTopRounded } from '@material-ui/icons'
import {
	Header,
	ConfirmedListTable,
	HKResult,
	SlideMenu,
	Article,
	GoogleMap,
	ChinaResult,
} from '../component'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'
import { size, tool } from '../common'
import { brief, percaution, links } from '../article'

interface IMainPageProps {
	locale: string
	onChangeLanguage: (locale: string) => void
}

const MainPage: React.FC<IMainPageProps> = (props) => {
	const { locale, onChangeLanguage } = props
	const classes = useStyles()
	const { formatMessage: f } = useIntl()

	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)

	const onMenuOpenPress = React.useCallback(() => {
		setIsMenuOpen(!isMenuOpen)
	}, [isMenuOpen])

	const onScrollToTopPress = React.useCallback(() => {
		tool.onScrollToTablePress('overview')
	}, [])

	const article_percaution = locale === 'zh' ? percaution.article_zh : percaution.article_en
	const article_brief = locale === 'zh' ? brief.article_zh : brief.article_en
	const article_link = locale === 'zh' ? links.article_zh : links.article_en

	return (
		<div>
			<IconButton className={classes.btnScrollToTop} onClick={onScrollToTopPress}>
				<VerticalAlignTopRounded />
			</IconButton>
			<Hidden mdUp implementation='js'>
				<IconButton className={classes.btnFloatMenu} onClick={onMenuOpenPress}>
					<ListAltRounded />
				</IconButton>
			</Hidden>
			<Hidden mdUp implementation='js'>
				<Drawer
					variant='temporary'
					anchor='left'
					open={isMenuOpen}
					onClose={onMenuOpenPress}
					classes={{ paper: classes.slideMenu }}
					ModalProps={{ keepMounted: true }}
				>
					<SlideMenu onCloseMenu={onMenuOpenPress} onChangeLanguage={onChangeLanguage} />
				</Drawer>
			</Hidden>
			{
				// ---
			}
			<Grid container>
				<Hidden smDown implementation='js'>
					<Grid item md={2} lg={2}>
						<SlideMenu onChangeLanguage={onChangeLanguage} />
					</Grid>
				</Hidden>
				<Grid item xs={12} md={10}>
					<Grid container>
						<Grid item xs={12} md={12} className={classes.gridItem}>
							<HKResult />
						</Grid>
						<Grid item xs={12} md={6} className={classes.gridItem}>
							<ChinaResult />
						</Grid>
						<Grid item xs={12} md={6} className={classes.gridItem}>
							<Article article={article_brief} />
						</Grid>
						<Grid item xs={12} md={6} className={classes.gridItem}>
							<Article article={article_percaution} />
						</Grid>
						<Grid item xs={12} md={6} className={classes.gridItem}>
							<Article article={article_link} />
						</Grid>
						<Grid item xs={12} md={12} className={classes.gridItem}>
							<ConfirmedListTable />
						</Grid>
						<Grid item xs={12} md={12} className={classes.gridItem}>
							<Header id='map' headerType='None' title={f({ id: 'slide_item_6' })} />
							<GoogleMap />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	slideMenu: {
		width: 'calc( 100vw * 0.6 )',
	},
	btnFloatMenu: {
		position: 'fixed',
		height: size.header,
		width: size.header,
		top: 0,
		left: 0,
		zIndex: 1000,
	},
	btnScrollToTop: {
		position: 'fixed',
		height: size.header,
		width: size.header,
		bottom: 0,
		right: 0,
		zIndex: 1000,
	},
	gridItem: {},
}))

export default React.memo(MainPage)
