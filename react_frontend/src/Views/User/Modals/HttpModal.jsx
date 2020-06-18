import React, { useState } from "react";
import SnackBar from "../../../Components/SnackBar";
import { Card, CardHeader, CardContent, Button, TextField } from "@material-ui/core";
import { updateUser } from "../../../Redux/actions/users";

const HttpModal = ({ image, handleHttpModal }) => {
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("info");
	const [message, setMessage] = useState("");
	const [direction, setDirection] = useState(image);

	const openSnackBar = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
			setMessage("");
			setType("info");
		}, 2500);
	};

	const handleEdit = (event) => {
		event.preventDefault();
		const user = { image_path: direction };
		updateUser(user)
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
			handleHttpModal();
		}, 2000);
	};

	return (
		<Card>
			<CardHeader title='Busca una imagen en internet' />
			<CardContent>
				<form onSubmit={handleEdit} className='flex-column center'>
					<TextField
						name='image'
						variant='outlined'
						margin='dense'
						value={direction}
						onChange={(event) => {
							setDirection(event.target.value);
						}}
						label='Dirección http'
					/>
					<br />
					<Button type='submit' size='small' variant='contained' color='primary'>
						Elegir
					</Button>
				</form>
			</CardContent>
			<SnackBar type={type} open={open} message={message} />
		</Card>
	);
};

export default HttpModal;
