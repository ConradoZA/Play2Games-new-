import React, { useEffect } from "react";
import store from "../../Redux/store";
import RecordSkeleton from "./RecordSkeleton";
import { getAllGames } from "../../Redux/actions/checkerGames";
import { Paper } from "@material-ui/core";
import { API_URL_IMAGES } from "../../api-config";

const GameList = () => {
	const state = store.getState();
	const username = state.user.user.name;
	const allGames = state.allCheckersGame.all;
	const gamesEnded = allGames.filter((game) => game.winner !== "");
	useEffect(() => {
		getAllGames();
	}, []);

	return (
		<>
			{gamesEnded.length === 0 && (
				<Paper className='paper flex-column center'>
					<h2>Primero termina una partida</h2>
					<img
						className='vw80'
						src={API_URL_IMAGES + "Egyptian Checkers Players.jpg"}
						alt='finish a game first'
					/>
					<br />
				</Paper>
			)}
			{gamesEnded.map((game) => {
				return <RecordSkeleton game={game} name={username} key={game._id} />;
			})}
		</>
	);
};
export default GameList;
