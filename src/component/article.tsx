import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Header } from '.'
import { size } from '../common'

interface IArticleProps {
	article: IArticle
}

let itemKey = 0
const Article: React.FC<IArticleProps> = (props) => {
	const { article } = props
	const classes = useStyles()
	if (!article) return null
	const content = article.content
	return (
		<div className={classes.container}>
			<Header id={article.id} headerType='None' title={article.title} />
			{!!article.subTitle && <div className={classes.date}>{article.subTitle}</div>}
			<div className={classes.content}>
				{content.map((item) => {
					return createElementByTag(item, classes)
				})}
			</div>
		</div>
	)
}

const createElementByTag = (item: IArticleContent, classes: any) => {
	const tag = item.tag
	switch (tag) {
		case 'p': {
			const content = item.content as string
			if (!content) return null
			return (
				<p key={`${itemKey++}`} className={classes.p} style={item.style}>
					{content}
				</p>
			)
		}
		case 'ul': {
			let content = item.content
			if (Array.isArray(content)) {
				if (typeof content[0] === 'string') {
					content = content as string[]
					return (
						<ul key={`${itemKey++}`} className={classes.ul} style={item.style}>
							{content.map((contentItem) => {
								if (!contentItem) return null
								return (
									<li key={`${itemKey++}`} className={classes.ui}>
										{contentItem.trim()}
									</li>
								)
							})}
						</ul>
					)
				} else {
					content = content as IArticleContent[]
					return (
						<ul key={`${itemKey++}`} className={classes.ul} style={item.style}>
							{content.map((contentItem) => {
								return (
									<li key={`${itemKey++}`} className={classes.ui}>
										{createElementByTag(contentItem, classes)}
									</li>
								)
							})}
						</ul>
					)
				}
			} else {
				return null
			}
		}
		case 'a': {
			const content = item.content as string
			return (
				<a
					key={`${itemKey++}`}
					style={item.style}
					href={item.href}
					target='_blank'
					rel='noopener noreferrer'
				>
					{content}
				</a>
			)
		}
		case 'break': {
			return <div key={`${itemKey++}`} style={item.style} />
		}
		default:
			return null
	}
}

const useStyles = makeStyles((theme) => ({
	container: {},
	date: {
		margin: 10,
		fontSize: size.font_date,
		fontWeight: 'bold',
		textAlign: 'end',
	},
	content: {
		padding: '0 20px 20px 20px',
	},
	p: {
		fontSize: size.font_def_p,
		fontWeight: 'bold',
	},
	ul: {
		fontSize: size.font_def_ul,
	},
	ui: {
		fontSize: size.font_def_ui,
		marginBottom: 5,
	},
}))

export default React.memo(Article)
