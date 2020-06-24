import React, { useState } from "react";
import { API_URL_IMAGES } from "../api-config";
import SnackBar from "./SnackBar";
import { connect } from "react-redux";
import { Paper, InputLabel, Input, InputAdornment } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CancelScheduleSendIcon from "@material-ui/icons/CancelScheduleSend";
import SendIcon from "@material-ui/icons/Send";

import { updateUser, confirmMail } from "../Redux/actions/users";
import { Link } from "react-router-dom";

const Profile = (props) => {
	const user = props.user.user;
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [inputName, setInputName] = useState(true);
	const [inputMail, setInputMail] = useState(true);
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("info");
	const [message, setMessage] = useState("");

	const openSnackBar = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
			setMessage("");
			setType("info");
		}, 2500);
	};

	const handleInputName = () => {
		setInputName(!inputName);
	};
	const handleInputMail = () => {
		setInputMail(!inputMail);
	};
	const handleConfirmMail = () => {
		confirmMail()
			.then((_res) => {
				setMessage("Te hemos enviado un e-mail");
				setType("info");
				openSnackBar();
			})
			.catch((_error) => {
				setMessage("Inténtalo de nuevo");
				setType("error");
				openSnackBar();
			});
	};

	const handleEdit = () => {
		const userProfile = {
			name,
			email,
		};
		updateUser(userProfile)
			.then((_res) => {
				setMessage("Datos Actualizados");
				setType("success");
				openSnackBar();
			})
			.catch((_error) => {
				setMessage("Inténtalo de nuevo");
				setType("error");
				openSnackBar();
			});
		if (!inputName) {
			handleInputName();
		}
		if (!inputMail) {
			handleInputMail();
		}
	};

	return (
		<>
			<Paper className='paper profile-container'>
				<div className='profile'>
					<img
						src={
							user?.image_path.includes("http")
								? user?.image_path
								: API_URL_IMAGES + user?.image_path
						}
						alt='user'
						className='img-profile'
					/>
					<div className='flex-column-evenly'>
						<InputLabel id='name'>Nombre</InputLabel>
						<Input
							labelId='name'
							className='input-width'
							disabled={inputName}
							value={name}
							margin='dense'
							onChange={(event) => {
								setName(event.target.value);
							}}
							startAdornment={
								<InputAdornment>
									<EditIcon onClick={handleInputName} className='pointer' />
								</InputAdornment>
							}
							endAdornment={
								<InputAdornment>
									{inputName ? (
										<CancelScheduleSendIcon className='pointer' />
									) : (
										<SendIcon onClick={handleEdit} className='pointer' />
									)}
								</InputAdornment>
							}
						/>
						<br />
						<InputLabel id='email'>E-mail</InputLabel>
						{user?.email_verified ? (
							<Input
								className='input-width'
								labelId='email'
								disabled
								margin='dense'
								value={email}
							/>
						) : (
							<Input
								className='input-width'
								labelId='email'
								disabled={inputMail}
								margin='dense'
								value={email}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								startAdornment={
									<InputAdornment>
										<EditIcon onClick={handleInputMail} className='pointer' />
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment>
										{inputMail ? (
											<CancelScheduleSendIcon className='pointer' />
										) : (
											<SendIcon onClick={handleEdit} className='pointer' />
										)}
									</InputAdornment>
								}
							/>
						)}
						{user?.email_verified ? (
							""
						) : (
							<Link
								to='#'
								className='link-like'
								onClick={handleConfirmMail}
								variant='body2'>
								Confirmar e-mail
							</Link>
						)}
					</div>
				</div>
			</Paper>
			<SnackBar type={type} open={open} message={message} />
		</>
	);
};

const mapStateToProps = (state) => ({ user: state.user });
export default connect(mapStateToProps)(Profile);
