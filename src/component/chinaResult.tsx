import React from 'react'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { Header } from '.'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import { fetchQQChinaResult } from '../api'
import { color, size } from '../common'
import withWidth from '@material-ui/core/withWidth'

interface IChinaResultProps {
	width: Breakpoint
}

const ChinaResult: React.FC<IChinaResultProps> = (props) => {
	const { width } = props
	const classes = useStyles()
	const { formatMessage: f } = useIntl()

	const [data, setData] = React.useState<ISARIChinaResult | null>(null)

	React.useEffect(() => {
		fetchQQChinaResult(
			(res) => {
				try {
					const data = JSON.parse(res.data) as ISARIChinaResult
					setData(data)
				} catch (ex) {}
			},
			(_) => {},
		)
	}, [])

	let itemSize = '100px'
	if (width === 'xs' || width === 'sm') {
		itemSize = 'calc( ( 100vw - 50px ) / 3  )'
	} else {
		itemSize = 'calc( 100vw / 9 )'
	}

	if (!data) return <div />

	let confirm_other = 0
	let confirm_china = 0
	let heal_other = 0
	let heal_china = 0
	let dead_other = 0
	let dead_china = 0

	data.areaTree.forEach((region, index) => {
		if (index > 0) {
			confirm_other += region.total.confirm
			heal_other += region.total.heal
			dead_other += region.total.dead
		} else {
			confirm_china += region.total.confirm
			heal_china += region.total.heal
			dead_china += region.total.dead
		}
	})

	const healRate_chain = ((heal_china / confirm_china) * 100).toFixed(1)

	return (
		<div className={classes.container}>
			<Header id='china' title={f({ id: 'slide_item_7' })} />
			<div className={classes.date}>
				{f({ id: 'date_statu_as' }, { date: data.lastUpdateTime })}
			</div>
			<div className={classes.title}>{f({ id: 'title_greater_china' })}</div>
			<div className={classes.content}>
				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{confirm_china}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_confirmed2' })}</div>
				</div>

				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{`${healRate_chain}%`}</span>
						<span className={classes.smallValue}>{`(${heal_china})`}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_discharged' })}</div>
				</div>
				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{dead_china}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_deceased' })}</div>
				</div>
			</div>
			<div className={classes.title}>{f({ id: 'title_oversea' })}</div>
			<div className={classes.content}>
				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{confirm_other}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_confirmed2' })}</div>
				</div>

				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{heal_other}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_discharged' })}</div>
				</div>
				<div className={classes.item} style={{ height: itemSize, width: itemSize }}>
					<div className={classes.value}>
						<span>{dead_other}</span>
					</div>
					<div className={classes.itemTitle}>{f({ id: 'status_deceased' })}</div>
				</div>
			</div>
			<div className={classes.txtRef}>
				<a
					href='https://news.qq.com/zt2020/page/feiyan.htm'
					target='_blank'
					rel='noopener noreferrer'
				>
					{f({ id: 'ref_chinaresult' })}
				</a>
			</div>
		</div>
	)
}

const useStyles = makeStyles({
	container: {},
	date: {
		margin: 10,
		fontSize: size.font_date,
		fontWeight: 'bold',
		textAlign: 'end',
	},
	title: {
		margin: 10,
		fontSize: size.font_title,
		fontWeight: 'bold',
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		margin: '10px 10px 0 10px',
	},
	item: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		borderRadius: '20px',
		overflow: 'hidden',
		margin: '10px 5px',
		backgroundColor: color.header,
	},
	value: {
		flex: 1,
		textAlign: 'center',
		fontSize: 25,
		fontWeight: 'bold',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	smallValue: {
		fontSize: 12,
		lineHeight: '15px',
	},
	itemTitle: {
		textAlign: 'center',
		fontSize: size.font_item_title,
		fontWeight: 'bold',
		padding: '7px 7px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: color.disclaimer,
	},
	txtRef: {
		fontSize: size.font_ref,
		margin: '10px 10px 20px 10px',
		textAlign: 'end',
		color: color.black,
	},
})

export default withWidth()(React.memo(ChinaResult))
