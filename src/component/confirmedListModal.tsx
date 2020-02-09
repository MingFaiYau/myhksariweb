import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade } from '@material-ui/core'
import { ConfirmedListTable } from '.'

interface IConfirmedListModalProps {
	data: ISARIConfirmedCase[] | null
	isOpen: boolean
	onClosePress: () => void
}

const ConfirmedListModal: React.FC<IConfirmedListModalProps> = (props) => {
	const { data, isOpen, onClosePress } = props
	const classes = useStyles()

	if (!data) return null
	return (
		<Modal
			className={classes.modal}
			open={isOpen}
			onClose={onClosePress}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={isOpen}>
				<div>
					<ConfirmedListTable data={data} />
				</div>
			</Fade>
		</Modal>
	)
}

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	table: {
		width: 'calc( 100vw * 0.8 )',
		height: 'calc( 100vh * 0.8 )',
	},
}))

export default ConfirmedListModal
