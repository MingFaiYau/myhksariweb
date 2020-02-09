import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
} from '@material-ui/core'
import { tool } from '../common'

interface IConfirmedListTableProps {
	data: ISARIConfirmedCase[] | null
}

const ConfirmedListTable: React.FC<IConfirmedListTableProps> = (props) => {
	const { data } = props
	const classes = useStyles()

	if (!data) return null
	return (
		<TableContainer  className={classes.container}>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>個案</TableCell>
						<TableCell>年齡</TableCell>
						<TableCell>性別</TableCell>
						<TableCell>發病日期</TableCell>
						<TableCell>確診日期</TableCell>
						<TableCell>個案分類</TableCell>
						<TableCell>入住醫院名稱</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.map((value) => (
						<TableRow key={value.attributes.ObjectId}>
							<TableCell component='th' scope='row'>
								{value.attributes.個案編號}
							</TableCell>
							<TableCell>{value.attributes.年齡}</TableCell>
							<TableCell>{value.attributes.性別}</TableCell>
							<TableCell>{tool.convertDate(value.attributes.發病日期)}</TableCell>
							<TableCell>
								{tool.convertDate(value.attributes.實驗室確診報告日期)}
							</TableCell>
							<TableCell>{value.attributes.個案分類}</TableCell>
							<TableCell>{value.attributes.入住醫院名稱}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

const useStyles = makeStyles((theme) => ({
	container: {},
}))

export default React.memo(ConfirmedListTable)
