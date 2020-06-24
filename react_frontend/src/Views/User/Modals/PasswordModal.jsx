import React, { useEffect, useState } from "react";
import { Paper, Button } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { updateUser } from "../../../Redux/actions/users";
import SnackBar from "../../../Components/SnackBar";

const PasswordModal = ({ handlePasswordModal }) => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [repeatNewPassword, setRepeatNewPassword] = useState("");
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("info");
	const [message, setMessage] = useState("");

	useEffect(() => {
		ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
			if (value !== newPassword) {
				return false;
			}
			return true;
		});
		return () => {
			ValidatorForm.removeValidationRule("isPasswordMatch");
		};
	}, [repeatNewPassword, newPassword]);

	const handleSubmit = () => {
		const password = newPassword;
		const userProfile = {
			password,
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
		setTimeout(() => {
			handlePasswordModal();
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
		<Paper>
			<h3>¿Quieres cambiar tu contraseña?</h3>
			<ValidatorForm
				onSubmit={handleSubmit}
				onError={(errors) => console.log(errors)}
				className='flex-column center'>
				<TextValidator
					className='input-width'
					name='oldPassword'
					onChange={(event) => {
						setOldPassword(event.target.value);
					}}
					value={oldPassword}
					variant='outlined'
					required
					label='Contraseña actual'
					type='password'
					validators={[
						"minStringLength:6",
						"matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&.,_?`´:;çºª|· ¬¡¿])(?=.{6,})",
					]}
					errorMessages={[
						"Longitud mínima: 6 caracteres",
						"Debe contener minúscula, mayúscula, número y caracter especial",
					]}
				/>
				<br />
				<TextValidator
					className='input-width'
					name='newPassword'
					onChange={(event) => {
						setNewPassword(event.target.value);
					}}
					value={newPassword}
					variant='outlined'
					required
					label='Nueva contraseña'
					type='password'
					validators={[
						"minStringLength:6",
						"matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&.,_?`´:;çºª|· ¬¡¿])(?=.{6,})",
					]}
					errorMessages={[
						"Longitud mínima: 6 caracteres",
						"Debe contener minúscula, mayúscula, número y caracter especial",
					]}
				/>
				<br />
				<TextValidator
					className='input-width'
					name='repeatNewPassword'
					onChange={(event) => {
						setRepeatNewPassword(event.target.value);
					}}
					value={repeatNewPassword}
					variant='outlined'
					required
					label='Repite la nueva contraseña'
					type='password'
					validators={["isPasswordMatch"]}
					errorMessages={["Las contraseñas no coinciden"]}
				/>
				<br />
				<Button type='submit' variant='contained' color='secondary' size='small'>
					Cambiar contraseña
				</Button>
				<br />
			</ValidatorForm>
			<SnackBar type={type} open={open} message={message} />
		</Paper>
	);
};

export default PasswordModal;
