import store from "../../Redux/store";
import { setNewMove } from "../../Redux/actions/checkerPlays";
import { crownPawn } from "./GameRules";

var PAWN_CAN_MOVE_1 = false;
var PAWN_CAN_MOVE_2 = false;
var POSIBLE_CAPTURE_1 = [];
var POSIBLE_CAPTURE_2 = [];
const special_state = store.getState();
const special_present = special_state.checkersPlay?.present;

export function whitePawnCanCapture(actualPiece, tablePosition = special_present) {
	const pieces = tablePosition;
	const SIDE = actualPiece[2][0];
	const MX = actualPiece[0];
	const MY = actualPiece[1];
	const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const OBSTRUCTS = pieces.filter(
		(piece) => (piece[0] === MX - 1 || piece[0] === MX + 1) && piece[1] === MY + 1
	);
	const POSIBLE_CAPTURES = OBSTRUCTS.filter((piece) => !piece[2].includes(SIDE));
	const PIECES_TO_CAPTURE = [];

	POSIBLE_CAPTURE_1 = POSIBLE_CAPTURES.filter(
		(piece) =>
			piece[0] - 1 === MX - 2 &&
			piece[1] + 1 === MY + 2 &&
			NUMBERS.includes(MX - 2) &&
			NUMBERS.includes(MY + 2)
	).flat();
	POSIBLE_CAPTURE_2 = POSIBLE_CAPTURES.filter(
		(piece) =>
			piece[0] + 1 === MX + 2 &&
			piece[1] + 1 === MY + 2 &&
			NUMBERS.includes(MX + 2) &&
			NUMBERS.includes(MY + 2)
	).flat();

	var EMPTY_CAPTURE_1 = "no";
	var EMPTY_CAPTURE_2 = "no";
	if (POSIBLE_CAPTURE_1.length === 4) {
		EMPTY_CAPTURE_1 = pieces
			.filter((piece) => piece[0] === MX - 2 && piece[1] === MY + 2)
			.flat()
			.toString();
	}
	if (POSIBLE_CAPTURE_2.length === 4) {
		EMPTY_CAPTURE_2 = pieces
			.filter((piece) => piece[0] === MX + 2 && piece[1] === MY + 2)
			.flat()
			.toString();
	}
	if (!!!EMPTY_CAPTURE_1) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_1);
	}
	if (!!!EMPTY_CAPTURE_2) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_2);
	}
	return PIECES_TO_CAPTURE;
}

export function whitePawnMove(toX, toY, actualPiece) {
	const state = store.getState();
	const pieces = state.checkersPlay.present;
	const MX = actualPiece[0];
	const MY = actualPiece[1];
	const DX = MX - toX;
	const DY = MY - toY;
	PAWN_CAN_MOVE_1 = DX === 1 && DY === -1;
	PAWN_CAN_MOVE_2 = DX === -1 && DY === -1;
	const OBSTRUCTS = pieces.filter(
		(piece) => (piece[0] === MX - 1 || piece[0] === MX + 1) && piece[1] === MY + 1
	);
	const captures = whitePawnCanCapture(actualPiece, pieces);

	OBSTRUCTS.map((piece) => {
		if (piece[0] === MX - 1 && piece[1] === MY + 1) {
			PAWN_CAN_MOVE_1 = false;
		}
		if (piece[0] === MX + 1 && piece[1] === MY + 1) {
			PAWN_CAN_MOVE_2 = false;
		}
	});

	if (captures.length > 0) {
		captures.map((piece) => {
			if (POSIBLE_CAPTURE_1.length > 0 && piece[0] === MX - 1 && piece[1] === MY + 1) {
				PAWN_CAN_MOVE_1 = DX === 2 && DY === -2;
				if (!POSIBLE_CAPTURE_2.length > 0) {
					PAWN_CAN_MOVE_2 = false;
				}
			} else if (piece[0] === MX - 1 && piece[1] === MY + 1) {
				PAWN_CAN_MOVE_1 = false;
			}
			if (POSIBLE_CAPTURE_2.length > 0 && piece[0] === MX + 1 && piece[1] === MY + 1) {
				PAWN_CAN_MOVE_2 = DX === -2 && DY === -2;
				if (!POSIBLE_CAPTURE_1.length > 0) {
					PAWN_CAN_MOVE_1 = false;
				}
			} else if (piece[0] === MX + 1 && piece[1] === MY + 1) {
				PAWN_CAN_MOVE_2 = false;
			}
		});
	}
	return PAWN_CAN_MOVE_1 || PAWN_CAN_MOVE_2;
}

export function whitePawnResults(newPiecePosition) {
	const state = store.getState();
	var moved = true;
	var newBoard = state.checkersPlay.present.filter(
		(piece) => newPiecePosition[3] !== piece[3]
	);
	if (
		POSIBLE_CAPTURE_1.length > 0 &&
		POSIBLE_CAPTURE_1[0] - 1 === newPiecePosition[0] &&
		POSIBLE_CAPTURE_1[1] + 1 === newPiecePosition[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_1[3] !== piece[3]);
		const chain = whitePawnCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	} else if (
		POSIBLE_CAPTURE_2.length > 0 &&
		POSIBLE_CAPTURE_2[0] + 1 === newPiecePosition[0] &&
		POSIBLE_CAPTURE_2[1] + 1 === newPiecePosition[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_2[3] !== piece[3]);
		const chain = whitePawnCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	}
	newBoard.push(newPiecePosition);
	crownPawn(newBoard);
	setNewMove(newBoard, moved);
}
