import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'
import { percaution } from '../article/percaution'

const Precaution: React.FC<{}> = () => {
	const classes = useStyles()
	const { formatMessage: f } = useIntl()

	const percaution_lang = f({ id: 'precaution_content' }) as TPercaution
	const article = percaution[percaution_lang]
	if (!article) return null
	const content = article.content
	return (
		<div className={classes.container}>
			{!!article.ref && (
				<div className={classes.date}>
					<a href={article.ref} target='new'>
						{f({ id: 'article_ref' })}
					</a>
				</div>
			)}
			<div className={classes.content}>
				{content.map((item, itemIndex) => {
					const tag = item.tag
					const content = item.content
					switch (tag) {
						case 'p': {
							return content.map((contentItem, contentItemIndex) => {
								if (!contentItem) return null
								return (
									<p
										key={`${itemIndex}_${contentItemIndex}`}
										className={classes.p}
									>
										{contentItem}
									</p>
								)
							})
						}
						case 'ul': {
							return (
								<ul key={itemIndex} className={classes.ul}>
									{content.map((contentItem, contentItemIndex) => {
										if (!contentItem) return null
										return (
											<li
												key={`${itemIndex}_${contentItemIndex}`}
												className={classes.ui}
											>
												{contentItem.trim()}
											</li>
										)
									})}
								</ul>
							)
						}
						case 'break': {
							return <div key={itemIndex} style={{ height: content[0] }} />
						}
						default:
							return null
					}
				})}
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	container: {},
	date: {
		margin: 10,
		fontWeight: 'bold',
		textAlign: 'end',
	},
	content: {
		padding: '0 20px 20px 20px',
	},
	p: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	ul: {
		fontSize: 14,
	},
	ui: {
		marginBottom: 5,
	},
}))

export default React.memo(Precaution)
