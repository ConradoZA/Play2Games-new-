import React, { useState } from "react";
import { Card, CardContent, CardHeader, Button, CardActions } from "@material-ui/core";
import SnackBar from "../../Components/SnackBar";
import { acceptDraw, rejectDraw } from "../../Redux/actions/checkerGames";

const AcceptDraw = (props) => {
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

	const sayNo = () => {
		rejectDraw(props.id)
			.then((_res) => {
				setMessage("¡Hasta la muerte!");
				setType("error");
				openSnackBar();
				setTimeout(() => {
					props.handleDrawInvitation();
				}, 2500);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	const sayYes = () => {
		acceptDraw(props.id)
			.then((_res) => {
				setMessage("Ha sido una buena partida");
				setType("success");
				openSnackBar();
				setTimeout(() => {
					props.handleDrawInvitation();
				}, 2500);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<Card className='flex-column center'>
			<CardHeader title='Propuesta de tablas' />
			<CardContent className='space-between'>
				<p>
					Tu oponente te está ofreciendo una oportunidad para acabar la partida en empate.
				</p>
			</CardContent>
			<CardActions className='space-evenly fullW'>
				<Button variant='contained' color='secondary' onClick={sayNo}>
					¡Nunca!
				</Button>
				<Button variant='contained' color='primary' onClick={sayYes}>
					Está bien
				</Button>
			</CardActions>

			<SnackBar type={type} open={open} message={message} />
		</Card>
	);
};
export default AcceptDraw;
