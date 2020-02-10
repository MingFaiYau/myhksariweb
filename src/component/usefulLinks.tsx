import React from 'react'
import { List, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'
import { Header } from '.'
import { links } from '../links'

const UsefulLinks: React.FC<{}> = () => {
	const classes = useStyles()
	const { formatMessage: f } = useIntl()

	return (
		<div className={classes.container}>
			<Header id='useful_links' headerType='None' title={f({ id: 'slide_item_5' })} />
			<List className={classes.list}>
				{links.map((item, index) => {
					const onItemPress = () => {
						window.open(item.href)
					}
					return (
						<div key={index} className={classes.item} onClick={onItemPress}>
							<div className={classes.title}>{item.title}</div>
							<div className={classes.description}>{item.description}</div>
							<div className={classes.ref}>{item.ref}</div>
							{index !== links.length - 1 && <Divider variant='fullWidth' />}
						</div>
					)
				})}
			</List>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	container: {},
	list: {
		padding: '20px 20px 0 20px',
		width: '100%',
	},
	item: {
		marginBottom: 20,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		wordBreak: 'break-all',
	},
	description: {
		fontSize: 13,
		textDecoration: 'underline',
		margin: '10px 0',
		wordBreak: 'break-all',
	},
	ref: {
		fontSize: 8,
		textAlign: 'end',
		marginBottom: 10,
	},
}))

export default React.memo(UsefulLinks)
