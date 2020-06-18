import React, { useState } from "react";
import { Card, CardHeader, Button, CardActions } from "@material-ui/core";
import { offerDraw, unsetGame } from "../../Redux/actions/checkerGames";
import SnackBar from "../../Components/SnackBar";

const SendDraw = ({ handleDrawModal, id }) => {
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

	const sendTicket = () => {
		offerDraw(id)
			.then((_res) => {
				setMessage("Propuesta enviada. Ahora a esperar");
				setType("success");
				openSnackBar();
				setTimeout(() => {
					handleDrawModal();
					unsetGame();
				}, 2500);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const close = () => {
		handleDrawModal();
	};

	return (
		<Card className='flex-column center'>
			<CardHeader title='¿De verdad quieres intentar terminar la partida en empate?' />
			<CardActions className='space-evenly fullW'>
				<Button variant='contained' color='secondary' onClick={close}>
					No
				</Button>
				<Button variant='contained' color='primary' onClick={sendTicket}>
					Sí
				</Button>
			</CardActions>
			<SnackBar type={type} open={open} message={message} />
		</Card>
	);
};

export default SendDraw;
