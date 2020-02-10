import React from 'react'
import { Grid, Hidden, Drawer, IconButton } from '@material-ui/core'
import { MenuRounded } from '@material-ui/icons'
import {
	Indicator,
	Header,
	ConfirmedListTable,
	SariResultView,
	SlideMenu,
	Article,
	UsefulLinks,
	GoogleMap,
} from '../component'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'
import { fetchData, fetchConfirmedData } from '../api'
import { color, size } from '../common'
import { brief, percaution } from '../article'

interface IMainPageProps {
	locale: string
	onChangeLanguage: (locale: string) => void
}

const MainPage: React.FC<IMainPageProps> = (props) => {
	const { locale, onChangeLanguage } = props
	const classes = useStyles()
	const { formatMessage: f } = useIntl()

	const [loading, setLoading] = React.useState<boolean>(true)
	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)
	const [sariResult, setSariResult] = React.useState<ISARIResult | null>(null)
	const [confirmedData, setConfirmedData] = React.useState<ISARIConfirmedCase[] | null>(null)

	const article_percaution = locale === 'zh' ? percaution.article_zh : percaution.article_en
	const article_brief = locale === 'zh' ? brief.article_zh : brief.article_en

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

	const onMenuOpenPress = React.useCallback(() => {
		setIsMenuOpen(!isMenuOpen)
	}, [isMenuOpen])

	return (
		<div>
			<Hidden mdUp implementation='js'>
				<IconButton className={classes.btnFloatMenu} onClick={onMenuOpenPress}>
					<MenuRounded />
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
						<Grid item xs={12} md={6} className={classes.gridItem}>
							<Header id='overview' title={f({ id: 'slide_item_1' })} />
							<SariResultView data={sariResult} />
						</Grid>
						<Grid item xs={12} md={6} className={classes.gridItem}>
							<Article article={article_brief} />
						</Grid>
						<Grid item xs={12} md={6} className={classes.gridItem}>
							<Article article={article_percaution} />
						</Grid>
						<Grid item xs={12} md={6} className={classes.gridItem}>
							<UsefulLinks />
						</Grid>
						<Grid item xs={12} md={12} className={classes.gridItem}>
							<Header
								id='overview_confirmed'
								headerType='Confirmed'
								title={f({ id: 'slide_item_2' })}
								titleBgColor={color.confirmed}
							/>
							<ConfirmedListTable data={confirmedData} />
						</Grid>
						<Grid item xs={12} md={12} className={classes.gridItem}>
							<Header
								id='map'
								headerType='None'
								title={f({ id: 'slide_item_6' })}
							/>
							<GoogleMap />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Indicator loading={loading} />
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
	gridItem: {},
}))

export default React.memo(MainPage)
