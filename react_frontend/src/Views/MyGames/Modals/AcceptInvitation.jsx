import React, { useState } from "react";
import { Card, CardContent, CardHeader, Button, CardActions } from "@material-ui/core";
import { answerInvitation } from "../../../Redux/actions/checkerGames";
import SnackBar from "../../../Components/SnackBar";

const AcceptInvitation = (props) => {
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
		answerInvitation("no", props.id)
			.then((_res) => {
				setMessage("Ahora no, que me duele la cabeza");
				setType("error");
				openSnackBar();
				setTimeout(() => {
					props.handleAcceptInvitation();
				}, 2500);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	const sayYes = () => {
		answerInvitation("yes", props.id)
			.then((_res) => {
				setMessage("Challenge accepted... Las damas primero ;)");
				setType("success");
				openSnackBar();
				setTimeout(() => {
					props.handleAcceptInvitation();
				}, 2500);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<Card className='flex-column center'>
			<CardHeader title='Te han desafiado' />
			<CardContent className='space-between'>
				<p>
					¿Deseas jugar con y contra "<strong>{props.playerOne}</strong>", hasta que la
					victoria y la derrota os separe?
				</p>
			</CardContent>
			<CardActions className={"space-evenly fullW"}>
				<Button variant='contained' color='primary' onClick={sayNo}>
					Contigo no, bicho
				</Button>
				<Button variant='contained' color='secondary' onClick={sayYes}>
					Sí, quiero
				</Button>
			</CardActions>

			<SnackBar type={type} open={open} message={message} />
		</Card>
	);
};
export default AcceptInvitation;
