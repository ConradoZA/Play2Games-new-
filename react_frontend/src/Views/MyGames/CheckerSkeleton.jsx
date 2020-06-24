import React, { useState, useEffect } from "react";
import { API_URL_IMAGES } from "../../api-config";
import { Paper, Dialog } from "@material-ui/core";
import { setGame } from "../../Redux/actions/checkerGames";
import AcceptInvitation from "./Modals/AcceptInvitation";
import AcceptDraw from "./Modals/AcceptDraw";
import { getOneUser } from "../../Redux/actions/users";

const CheckerSkeleton = ({ game, name }) => {
	const checkTurnNumber = () => {
		if (game.gamePlay) {
			return game.gamePlay.turn;
		} else {
			return 0;
		}
	};
	const gameId = game._id;
	const playerOne = game.playerOne;
	const playerTwo = game.playerTwo;
	const initiated = game.initiated;
	const drawOffered = game.drawOffered;
	const turn = checkTurnNumber();
	const opponent = () => {
		if (playerOne === name) {
			return playerTwo;
		} else {
			return playerOne;
		}
	};
	const [opponentImage, setOpponentImage] = useState("");
	const [openAcceptTicket, setOpenAcceptTicket] = useState(false);
	const [openDrawTicket, setOpenDrawTicket] = useState(false);

	useEffect(() => {
		getOneUser(opponent()).then((res) => {
			setOpponentImage(res.data.image_path);
		});
	}, []);

	const checkTurn = () => {
		if (
			(turn % 2 === 0 && playerTwo === name) ||
			(turn % 2 === 1 && playerOne === name)
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleAcceptInvitation = () => {
		setOpenAcceptTicket(!openAcceptTicket);
	};
	const handleDrawInvitation = () => {
		setOpenDrawTicket(!openDrawTicket);
	};

	const goToGame = () => {
		if (drawOffered && checkTurn()) {
			return "";
		} else if (checkTurn() && initiated) {
			setGame(game);
		} else if (!initiated && playerTwo === name) {
			handleAcceptInvitation();
		} else if (drawOffered && checkTurn()) {
			return "";
		} else if (drawOffered) {
			handleDrawInvitation();
		}
	};

	return (
		<Paper className='paper'>
			<div className='flex pointer' onClick={goToGame}>
				{playerOne === name ? (
					<img
						src={API_URL_IMAGES + "images/white_player.png"}
						alt='checkers'
						className='img-small'
					/>
				) : (
					<img
						src={API_URL_IMAGES + "images/black_player.png"}
						alt='checkers'
						className='img-small'
					/>
				)}
				<div className='flex-column'>
					<p>
						<strong>Turno:</strong> {turn}
					</p>
					{(turn % 2 === 0 && playerTwo === name) ||
					(turn % 2 === 1 && playerOne === name) ? (
						<p>
							<strong>Juegas contra:</strong> {name === playerOne ? playerTwo : playerOne}
						</p>
					) : (
						<p>
							<strong>Turno de:</strong> {name === playerOne ? playerTwo : playerOne}
						</p>
					)}
					{!initiated && playerTwo === name ? (
						<h4 className='draw'>¿Quieres jugar?</h4>
					) : initiated ? (
						<></>
					) : (
						<h4>Invitación enviada</h4>
					)}
					{drawOffered && !checkTurn() && <h4 className='win'>Te ofrecen tablas</h4>}
					{checkTurn() && initiated && !drawOffered ? (
						<h4 className='red-main'>Te toca</h4>
					) : checkTurn() && drawOffered ? (
						<h4>Has pedido tablas</h4>
					) : !initiated && playerTwo === name ? (
						""
					) : (
						<h4>Esperando respuesta</h4>
					)}
				</div>
				{opponentImage && (
					<img src={API_URL_IMAGES + opponentImage} alt='' className="opponent-img" />
				)}
			</div>
			<Dialog open={openAcceptTicket} onClose={handleAcceptInvitation} fullWidth>
				<AcceptInvitation
					id={gameId}
					playerOne={playerOne}
					handleAcceptInvitation={handleAcceptInvitation}
				/>
			</Dialog>
			<Dialog open={openDrawTicket} onClose={handleDrawInvitation} fullWidth>
				<AcceptDraw id={gameId} handleDrawInvitation={handleDrawInvitation} />
			</Dialog>
		</Paper>
	);
};

export default CheckerSkeleton;
