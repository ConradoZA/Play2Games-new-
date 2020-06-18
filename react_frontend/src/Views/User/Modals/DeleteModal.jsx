import React, { useState, useRef } from "react";
import {
	Paper,
	Button,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { deleteUser } from "../../../Redux/actions/users";
import SnackBar from "../../../Components/SnackBar";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import { red } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

const RedCheckbox = withStyles({
	root: {
		color: "#d50000",
		"&$checked": {
			color: red[900],
		},
	},
	checked: {},
})((props) => <Checkbox color='default' {...props} />);

const DeleteModal = ({ handleDeleteModal }) => {
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("info");
	const [message, setMessage] = useState("");
	const [finalModal, setFinalModal] = useState(false);
	const [step0, setStep0] = useState(false);

	const step1Ref = useRef();
	const step2Ref = useRef();

	const step1 = () => {
		step1Ref.current.style.display = "";
		setStep0(true);
	};
	const step2 = () => {
		step2Ref.current.style.display = "";
	};

	const handleFinalModal = () => {
		setFinalModal(!finalModal);
		setStep0(false);
		step1Ref.current.style.display = "none";
		step2Ref.current.style.display = "none";
	};

	const handleDeleteUser = () => {
		deleteUser()
			.then((_res) => {
				setMessage("Te echaremos de menos");
				setType("warning");
				openSnackBar();
			})
			.catch((_error) => {
				setMessage("Inténtalo de nuevo");
				setType("info");
				openSnackBar();
			});
		setTimeout(() => {
			handleDeleteModal();
			history.push("/");
		}, 2500);
	};

	const openSnackBar = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
			setMessage("");
			setType("info");
		}, 2500);
	};

	return (
		<Paper className='flex-column center'>
			<h3>¿Nos dejas?</h3>
			<FormGroup row className='delete'>
				<FormControlLabel
					control={<Checkbox onChange={step1} checked={step0} name='erase1' />}
					label='Borrar Usuario'
					color='primary'
				/>
				<FormControlLabel
					className='red-main'
					style={{ display: "none" }}
					ref={step1Ref}
					control={<Checkbox onChange={step2} name='erase2' />}
					label='¿Seguro?'
				/>
				<FormControlLabel
					className='red-main'
					style={{ display: "none" }}
					ref={step2Ref}
					control={
						<RedCheckbox
							icon={<RemoveCircleOutlineRoundedIcon />}
							checkedIcon={<RemoveCircleRoundedIcon />}
							onChange={handleFinalModal}
						/>
					}
					name='erase3'
					label='¿¿ESTÁS SEGURO??'
				/>
			</FormGroup>
			<Dialog open={finalModal} onClose={handleFinalModal}>
				<DialogTitle>¿Seguro que quieres borrar tu usuario?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Última oportunidad, va en serio.
						<br />
						Toda tu información y tus partidas se perderán...
						<br />
						Como lágrimas en la lluvia.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleFinalModal} autoFocus>
						Cancelar
					</Button>
					<Button onClick={handleDeleteUser} color='primary'>
						Sí, borrar
					</Button>
				</DialogActions>
			</Dialog>
			<SnackBar type={type} open={open} message={message} />
		</Paper>
	);
};

export default DeleteModal;
