import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Header } from '.'

interface IArticleProps {
	article: IArticle
}

const Article: React.FC<IArticleProps> = (props) => {
	const { article } = props
	const classes = useStyles()
	if (!article) return null
	const content = article.content
	return (
		<div className={classes.container}>
			<Header id={article.id} headerType='None' title={article.title} />
			{!!article.subTitle && <div className={classes.subTitle}>{article.subTitle}</div>}
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
										style={item.style}
									>
										{contentItem}
									</p>
								)
							})
						}
						case 'ul': {
							return (
								<ul key={itemIndex} className={classes.ul} style={item.style}>
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
						case 'a': {
							return (
								<a key={itemIndex} style={item.style} href={item.href} target='new'>
									{item.content[0]}
								</a>
							)
						}
						case 'break': {
							return <div key={itemIndex} style={item.style} />
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
	subTitle: {
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
		fontSize: 13,
	},
	ui: {
		marginBottom: 7,
	},
}))

export default React.memo(Article)
