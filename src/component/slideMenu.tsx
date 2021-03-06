import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Header } from './'
import { color, tool } from '../common'

const slideMenuList: ISlideMenuItem[] = [
	{ title: 'slide_item_1', target: 'overview' },
	{ title: 'slide_item_2', target: 'overview_confirmed' },
	{ title: 'slide_item_6', target: 'map' },
	{ title: 'slide_item_7', target: 'china' },
	{ title: 'slide_item_4', target: 'brief' },
	{ title: 'slide_item_3', target: 'precaution' },
	{ title: 'slide_item_5', target: 'useful_links' },
]

interface ISlideMenuProps {
	onCloseMenu?: () => void
	onChangeLanguage: (locale: string) => void
}

const SlideMenu: React.FC<ISlideMenuProps> = (props) => {
	const { onCloseMenu, onChangeLanguage } = props
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<Header
				id='slide_menu'
				backgroundColor={color.banner}
				headerType='SlideMenu'
				onChangeLanguage={onChangeLanguage}
			/>
			{slideMenuList.map((item, index) => {
				const title = item.title
				const icon = item.icon
				const onItemPress = () => {
					setTimeout(() => {
						item.target && tool.onScrollToTablePress(item.target)
						setTimeout(() => {
							if (onCloseMenu) onCloseMenu()
						}, 200)
					}, 100)
				}
				return (
					<ListItem button key={index}>
						{!!icon && <ListItemIcon>{icon}</ListItemIcon>}
						<ListItemText
							primary={<FormattedMessage id={title} />}
							onClick={onItemPress}
						/>
					</ListItem>
				)
			})}
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	container: {
		position: 'fixed',
		[theme.breakpoints.down('md')]: {
			width: 'calc( 100vw * 0.6 )',
		},
		[theme.breakpoints.up('md')]: {
			width: 'calc( 100vw / 6.0 )',
		},
	},
}))

export default React.memo(SlideMenu)
