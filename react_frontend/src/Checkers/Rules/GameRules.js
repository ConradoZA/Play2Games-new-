import store from "../../Redux/store";
import { whitePawnMove, whitePawnResults, whitePawnCanCapture } from "./WhitePawnMoves";
import { blackPawnMove, blackPawnResults, blackPawnCanCapture } from "./BlackPawnMoves";
import { queenMove, queenResults, queenCanCapture } from "./QueenMoves";
import { endGame, acceptDraw } from "../../Redux/actions/checkerGames";

export function winningCondition() {
	const state = store.getState();
	const playerOne = state.checkersGame.playerOne;
	const playerTwo = state.checkersGame.playerTwo;
	const gameId = state.checkersGame.id;
	const captureTimer = state.checkersGame.captureTimer;
	const whiteSide = state.checkersPlay.present.filter((piece) => piece[2].includes("w"));
	const blackSide = state.checkersPlay.present.filter((piece) => piece[2].includes("b"));

	if (whiteSide.length === 0) {
		endGame(gameId, playerTwo);
	} else if (blackSide.length === 0) {
		endGame(gameId, playerOne);
	}
	if (captureTimer >= 25) {
		acceptDraw(gameId);
	}
}

export function checkTurn(id) {
	var iCan = [];
	const state = store.getState();
	const present = state.checkersPlay.present;
	const turn = state.checkersPlay.turn;
	const moved = state.checkersPlay.moved;
	const allPawnCaptures = [];
	const allQueenCaptures = [];
	if (turn % 2 === 1 && moved === false) {
		const me = present.find((piece) => piece[3] === id);
		const ownSide = present.filter((piece) => piece[2].includes("w"));
		ownSide.map((piece) => {
			if (piece[2].includes("p")) allPawnCaptures.push(whitePawnCanCapture(piece, present));
		});
		ownSide.map((piece) => {
			if (piece[2].includes("q")) allQueenCaptures.push(queenCanCapture(piece, present));
		});

		if (allPawnCaptures.flat().length > 0 && me[2].includes("p")) {
			iCan = whitePawnCanCapture(me, present);
			if (iCan.length > 0) {
				return "w";
			} else {
				return "no";
			}
		} else if (
			allPawnCaptures.flat().length === 0 &&
			allQueenCaptures.flat().length > 0 &&
			me[2].includes("p")
		) {
			return "no";
		}

		if (allQueenCaptures.flat().length > 0 && me[2].includes("q")) {
			iCan = queenCanCapture(me, present);
			if (iCan.length > 0) {
				return "w";
			} else {
				return "no";
			}
		} else if (
			allQueenCaptures.flat().length === 0 &&
			allPawnCaptures.flat().length > 0 &&
			me[2].includes("q")
		) {
			return "no";
		}
		return "w";
	} else if (turn % 2 === 0 && moved === false) {
		const me = present.find((piece) => piece[3] === id);
		const ownSide = present.filter((piece) => piece[2].includes("b"));
		ownSide.map((piece) => {
			if (piece[2].includes("p")) allPawnCaptures.push(blackPawnCanCapture(piece, present));
		});
		ownSide.map((piece) => {
			if (piece[2].includes("q")) allQueenCaptures.push(queenCanCapture(piece, present));
		});
		if (allPawnCaptures.flat().length > 0 && me[2].includes("p")) {
			iCan = blackPawnCanCapture(me, present);
			if (iCan.length > 0) {
				return "b";
			} else {
				return "no";
			}
		} else if (
			allPawnCaptures.flat().length === 0 &&
			allQueenCaptures.flat().length > 0 &&
			me[2].includes("p")
		) {
			return "no";
		}

		if (allQueenCaptures.flat().length > 0 && me[2].includes("q")) {
			iCan = queenCanCapture(me, present);
			if (iCan.length > 0) {
				return "b";
			} else {
				return "no";
			}
		} else if (
			allQueenCaptures.flat().length === 0 &&
			allPawnCaptures.flat().length > 0 &&
			me[2].includes("q")
		) {
			return "no";
		}
		return "b";
	} else {
		return "no";
	}
}

export function doesCapture(arr1, arr2) {
	if (arr1.length !== arr2.length) {
		return true;
	}
	return false;
}

export function crownPawn(tablePosition) {
	tablePosition.map((piece) => {
		if (piece[2] === "wp" && piece[1] === 9) {
			piece[2] = "wq";
		}
		if (piece[2] === "bp" && piece[1] === 0) {
			piece[2] = "bq";
		}
	});
}

export function canMove(toX, toY, item) {
	const state = store.getState();
	const pieces = state.checkersPlay.present;
	const actualPiece = pieces.find((piece) => item.id === piece[3]);
	const SIDE = actualPiece[2];
	if (SIDE.includes("b")) {
		if (SIDE.includes("p")) {
			return blackPawnMove(toX, toY, actualPiece);
		} else {
			return queenMove(toX, toY, actualPiece);
		}
	} else if (SIDE.includes("w")) {
		if (SIDE.includes("p")) {
			return whitePawnMove(toX, toY, actualPiece);
		} else {
			return queenMove(toX, toY, actualPiece);
		}
	}
}
export function move(toX, toY, item) {
	const state = store.getState();
	const pieces = state.checkersPlay.present;
	const actualPiece = pieces.find((piece) => item.id === piece[3]);
	const newPiecePosition = [toX, toY, actualPiece[2], actualPiece[3]];
	if (actualPiece[2] === "bp") {
		blackPawnResults(newPiecePosition);
	} else if (actualPiece[2] === "wp") {
		whitePawnResults(newPiecePosition);
	} else if (actualPiece[2].includes("q")) {
		queenResults(newPiecePosition);
	}
}
