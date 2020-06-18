import React from "react";
import store from "../../Redux/store";
import { Card, CardHeader, Button, CardActions, CardContent } from "@material-ui/core";
import { surrender, unsetGame } from "../../Redux/actions/checkerGames";

const SendSurrender = ({ handleSurrenderModal, id }) => {
	const state = store.getState();
	const me = state.user.user.name;
	const playerOne = state.checkersGame.playerOne;
	const playerTwo = state.checkersGame.playerTwo;

	const sendTicket = () => {
		if (me === playerOne) {
			surrender(id, playerTwo);
		} else if (me === playerTwo) {
			surrender(id, playerOne);
		}
		handleSurrenderModal();
		unsetGame();
	};
	const close = () => {
		handleSurrenderModal();
	};

	return (
		<Card className='flex-column center'>
			<CardHeader title='ÚLTIMA OPORTUNIDAD' />
			<CardContent>
				<p>¿De verdad quieres darte por rendido y abandonar la partida?</p>
				<p>Si le das a "sí" no hay vuelta atrás...</p>
			</CardContent>
			<CardActions className='space-evenly fullW'>
				<Button variant='contained' color='secondary' onClick={close}>
					¡NO!
				</Button>
				<Button variant='contained' color='primary' onClick={sendTicket}>
					Sí
				</Button>
			</CardActions>
		</Card>
	);
};

export default SendSurrender;
