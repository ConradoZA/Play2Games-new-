import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { recoverPassword } from "../../Redux/actions/users";
import SnackBar from "../../Components/SnackBar";
import { useHistory } from "react-router-dom";

const Recover = (props) => {
	const history = useHistory();
	const [newPassword, setNewPassword] = useState("");
	const [reNewPassword, setReNewPassword] = useState("");
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("info");
	const [message, setMessage] = useState("");
	const token = props.match.params.passToken;

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
	}, [reNewPassword, newPassword]);

	const openSnackBar = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
			setMessage("");
			setType("info");
		}, 2500);
	};

	const handleSubmit = () => {
		recoverPassword(token, newPassword)
			.then((_res) => {
				setMessage("Contraseña cambiada con éxito");
				setType("success");
				openSnackBar();
				setTimeout(() => {
					history.push("/login");
				}, 2500);
			})
			.catch((_error) => {
				setMessage("Vuelve a intentarlo");
				setType("error");
				openSnackBar();
			});
	};

	return (
		<Card raised className='card'>
			<CardHeader title='Aquí puedes crear una nueva contraseña para tu cuenta.' />
			<CardContent>
				<ValidatorForm
					onSubmit={handleSubmit}
					onError={(errors) => console.log(errors)}
					className='flex-column center'>
					<TextValidator
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
						name='reNewPassword'
						onChange={(event) => {
							setReNewPassword(event.target.value);
						}}
						value={reNewPassword}
						variant='outlined'
						required
						label='Repite la nueva contraseña'
						type='password'
						validators={["isPasswordMatch"]}
						errorMessages={["Las contraseñas no coinciden"]}
					/>
					<br />
					<Button type='submit' variant='contained' color='secondary' size='small'>
						Actualizar contraseña
					</Button>
				</ValidatorForm>
			</CardContent>
			<SnackBar type={type} open={open} message={message} />
		</Card>
	);
};

export default Recover;
