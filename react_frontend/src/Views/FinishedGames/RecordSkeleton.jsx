import React from "react";
import { Paper } from "@material-ui/core";
import { API_URL_IMAGES } from "../../api-config";
import { useHistory } from "react-router-dom";

const RecordSkeleton = ({ game, name }) => {
	let history = useHistory();
	const gameId = game._id;
	const playerOne = game.playerOne;
	const playerTwo = game.playerTwo;
	const winner = game.winner;
	const date = game.updatedAt.split(/[-T]/);
	const year = date[0];
	let month = date[1];
	const day = date[2];
	const months = [
		"enero",
		"febrero",
		"marzo",
		"abril",
		"mayo",
		"junio",
		"julio",
		"agosto",
		"septiembre",
		"octubre",
		"noviembre",
		"diciembre",
	];
	if (month.charAt() === "0") {
		month = month.slice(-1);
	}

	const goToGame = () => {
		history.push("/myRecord/" + gameId);
	};

	return (
		<Paper className='paper'>
			<div className='flex pointer' onClick={goToGame}>
				{winner === name ? (
					<img src={API_URL_IMAGES + "winner.png"} alt='you win!' className='img-small' />
				) : winner === "draw" ? (
					<img src={API_URL_IMAGES + "draw.png"} alt='draw' className='img-small' />
				) : (
					<img src={API_URL_IMAGES + "Loser.png"} alt='you lose' className='img-small' />
				)}
				<div className='flex-column'>
					<p className='margin-top-results'>
						Partida a <strong>Damas</strong>.
					</p>
					<p>
						Partida entre<strong> {playerOne} </strong>y<strong> {playerTwo}</strong>.
					</p>
					<p>
						Terminada el {day} de {months[month]} de {year}.
					</p>
					<p>
						<strong>Resultado: </strong>
						{winner === name ? (
							<span className='win strong'>GANASTE</span>
						) : winner === "draw" ? (
							<span className='draw strong'>EMPATE</span>
						) : (
							<span className='lose strong'>PERDISTE</span>
						)}
					</p>
				</div>
			</div>
		</Paper>
	);
};

export default RecordSkeleton;
