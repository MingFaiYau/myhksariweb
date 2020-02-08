import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

interface IConfirmedListModalProps {
	isOpen: boolean
	onClosePress: () => void
}

const ConfirmedListModal: React.FC<IConfirmedListModalProps> = (props) => {
	const { isOpen, onClosePress } = props
	const classes = useStyles()

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
				<div className={classes.paper} />
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
	paper: {
		width: 'calc( 100vw * 0.8 )',
		height: 'calc( 100vh * 0.8 )',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}))

export default ConfirmedListModal
