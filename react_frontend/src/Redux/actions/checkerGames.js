import store from "../store";
import axios from "axios";
import { API_URL_1 } from "../../api-config";

export const waitForAproval = async (playerTwo) => {
	const state = store.getState();
	const user = state.user.user;
	const payload = { playerOne: user.name, playerTwo };
	const res = await axios.post(API_URL_1 + "checkers/games/invitation", payload);
	const invitation = {
		id: res.data.invite._id,
		initiated: res.data.invite.initiated,
		playerOne: res.data.invite.playerOne,
		playerTwo: res.data.invite.playerTwo,
	};
	store.dispatch({
		type: "NEW_INVITATION",
		payload: invitation,
	});
	return res;
};

export const answerInvitation = async (answer, gameId) => {
	const res = await axios.put(API_URL_1 + "checkers/games/answer", {
		answer,
		gameId,
	});
	return res;
};

export const getAllGames = async () => {
	const state = store.getState();
	const user = state.user.user;
	const res = await axios.get(API_URL_1 + `checkers/games/getAll=${user.name}`);
	store.dispatch({
		type: "ALL_GAMES",
		payload: res.data,
	});
	return res;
};
export const getOneGame = async (gameId) => {
	const res = await axios.get(API_URL_1 + `checkers/games/get=${gameId}`);
	return res;
};
export const setGame = (game) => {
	store.dispatch({
		type: "SET_GAME",
		id: game._id,
		playerOne: game.playerOne,
		playerTwo: game.playerTwo,
		initiated: game.initiated,
		winner: game.winner,
		drawOffered: game.drawOffered,
	});
	store.dispatch({
		type: "SET_PLAY",
		id: game.gamePlay._id,
		past: game.gamePlay.past,
		present: game.gamePlay.present,
		turn: game.gamePlay.turn,
		whitePCaptured: game.gamePlay.whitePCaptured,
		blackPCaptured: game.gamePlay.blackPCaptured,
		captureTimer: game.gamePlay.captureTimer,
	});
};
export const unsetGame = () => {
	store.dispatch({
		type: "UNSET_GAME",
	});
	store.dispatch({
		type: "UNSET_PLAY",
	});
	return true;
};
export const offerDraw = async (playId) => {
	const res = await axios.put(API_URL_1 + "checkers/games/draw-offered", { playId });
	return res;
};
export const acceptDraw = async (gameId) => {
	await axios.put(API_URL_1 + "checkers/games/draw-accepted", { gameId });
	getAllGames();
};
export const rejectDraw = async (gameId) => {
	await axios.put(API_URL_1 + "checkers/games/draw-rejected", { gameId });
	getAllGames();
};
export const surrender = async (playId, winner) => {
	const res = await axios.put(API_URL_1 + "checkers/games/surrender", {
		playId,
		winner,
	});
	return res;
};
export const endGame = async (gameId, winner) => {
	const res = await axios.put(API_URL_1 + "checkers/games/game-finished", {
		gameId,
		winner,
	});
	return res;
};
