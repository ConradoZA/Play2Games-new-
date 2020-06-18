import store from "../../Redux/store";
import { setNewMove } from "../../Redux/actions/checkerPlays";

var QUEEN_CAN_MOVE_1 = false;
var QUEEN_CAN_MOVE_2 = false;
var QUEEN_CAN_MOVE_3 = false;
var QUEEN_CAN_MOVE_4 = false;
var POSIBLE_CAPTURE_1 = [];
var POSIBLE_CAPTURE_2 = [];
var POSIBLE_CAPTURE_3 = [];
var POSIBLE_CAPTURE_4 = [];
const special_state = store.getState();
const special_present = special_state.checkersPlay?.present;

export function queenMove(toX, toY, actualPiece) {
	const state = store.getState();
	const pieces = state.checkersPlay.present;
	const MX = actualPiece[0];
	const MY = actualPiece[1];
	const AX = Math.abs(MX - toX);
	const AY = Math.abs(MY - toY);
	const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const QUEEN_MOVE = AX === AY && NUMBERS.includes(AX) && NUMBERS.includes(AY);
	QUEEN_CAN_MOVE_1 = QUEEN_MOVE && MX > toX && MY < toY;
	QUEEN_CAN_MOVE_2 = QUEEN_MOVE && MX < toX && MY < toY;
	QUEEN_CAN_MOVE_3 = QUEEN_MOVE && MX < toX && MY > toY;
	QUEEN_CAN_MOVE_4 = QUEEN_MOVE && MX > toX && MY > toY;
	const OBSTRUCTS = pieces.filter((piece) => {
		const AXp = Math.abs(MX - piece[0]);
		const AYp = Math.abs(MY - piece[1]);
		return AXp === AYp && NUMBERS.includes(AXp) && NUMBERS.includes(AYp);
	});

	const CAN_CAPTURE = queenCanCapture(actualPiece, pieces);
	const CANT_CONTINUE = OBSTRUCTS.filter((piece1) => CAN_CAPTURE.every((piece2) => piece2[3] !== piece1[3]));

	CANT_CONTINUE.map((piece) => {
		if (toX <= piece[0] && toY >= piece[1] && MX > piece[0] && MY < piece[1]) {
			QUEEN_CAN_MOVE_1 = QUEEN_CAN_MOVE_1 && toX > piece[0] && toY < piece[1];
		} else if (toX >= piece[0] && toY >= piece[1] && MX < piece[0] && MY < piece[1]) {
			QUEEN_CAN_MOVE_2 = QUEEN_CAN_MOVE_2 && toX < piece[0] && toY < piece[1];
		} else if (toX >= piece[0] && toY <= piece[1] && MX < piece[0] && MY > piece[1]) {
			QUEEN_CAN_MOVE_3 = QUEEN_CAN_MOVE_3 && toX < piece[0] && toY > piece[1];
		} else if (toX <= piece[0] && toY <= piece[1] && MX > piece[0] && MY > piece[1]) {
			QUEEN_CAN_MOVE_4 = QUEEN_CAN_MOVE_4 && toX > piece[0] && toY > piece[1];
		}
	});

	if ((POSIBLE_CAPTURE_1.length === 4 || POSIBLE_CAPTURE_2.length === 4 || POSIBLE_CAPTURE_3.length === 4) && POSIBLE_CAPTURE_4.length === 0)
		QUEEN_CAN_MOVE_4 = false;
	if ((POSIBLE_CAPTURE_1.length === 4 || POSIBLE_CAPTURE_2.length === 4 || POSIBLE_CAPTURE_4.length === 4) && POSIBLE_CAPTURE_3.length === 0)
		QUEEN_CAN_MOVE_3 = false;
	if ((POSIBLE_CAPTURE_1.length === 4 || POSIBLE_CAPTURE_3.length === 4 || POSIBLE_CAPTURE_4.length === 4) && POSIBLE_CAPTURE_2.length === 0)
		QUEEN_CAN_MOVE_2 = false;
	if ((POSIBLE_CAPTURE_2.length === 4 || POSIBLE_CAPTURE_3.length === 4 || POSIBLE_CAPTURE_4.length === 4) && POSIBLE_CAPTURE_1.length === 0)
		QUEEN_CAN_MOVE_1 = false;

	if (POSIBLE_CAPTURE_1.length === 4)
		QUEEN_CAN_MOVE_1 =
			QUEEN_CAN_MOVE_1 &&
			toX !== POSIBLE_CAPTURE_1[0] &&
			toY !== POSIBLE_CAPTURE_1[1] &&
			NUMBERS.includes(POSIBLE_CAPTURE_1[0] - 1) &&
			NUMBERS.includes(POSIBLE_CAPTURE_1[1] + 1);

	if (POSIBLE_CAPTURE_2.length === 4)
		QUEEN_CAN_MOVE_2 =
			QUEEN_CAN_MOVE_2 &&
			toX !== POSIBLE_CAPTURE_2[0] &&
			toY !== POSIBLE_CAPTURE_2[1] &&
			NUMBERS.includes(POSIBLE_CAPTURE_2[0] + 1) &&
			NUMBERS.includes(POSIBLE_CAPTURE_2[1] + 1);

	if (POSIBLE_CAPTURE_3.length === 4)
		QUEEN_CAN_MOVE_3 =
			QUEEN_CAN_MOVE_3 &&
			toX !== POSIBLE_CAPTURE_3[0] &&
			toY !== POSIBLE_CAPTURE_3[1] &&
			NUMBERS.includes(POSIBLE_CAPTURE_3[0] + 1) &&
			NUMBERS.includes(POSIBLE_CAPTURE_3[1] - 1);

	if (POSIBLE_CAPTURE_4.length === 4)
		QUEEN_CAN_MOVE_4 =
			QUEEN_CAN_MOVE_4 &&
			toX !== POSIBLE_CAPTURE_4[0] &&
			toY !== POSIBLE_CAPTURE_4[1] &&
			NUMBERS.includes(POSIBLE_CAPTURE_4[0] - 1) &&
			NUMBERS.includes(POSIBLE_CAPTURE_4[1] - 1);

	return QUEEN_CAN_MOVE_1 || QUEEN_CAN_MOVE_2 || QUEEN_CAN_MOVE_3 || QUEEN_CAN_MOVE_4;
}

export function queenCanCapture(actualPiece, tablePosition = special_present) {
	const pieces = tablePosition;
	const SIDE = actualPiece[2][0];
	const MX = actualPiece[0];
	const MY = actualPiece[1];
	const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const PIECES_TO_CAPTURE = [];
	const OBSTRUCTS = pieces.filter((piece) => {
		const AXp = Math.abs(MX - piece[0]);
		const AYp = Math.abs(MY - piece[1]);
		return AXp === AYp && NUMBERS.includes(AXp) && NUMBERS.includes(AYp);
	});
	const POSIBLE_CAPTURES = OBSTRUCTS.filter((piece) => !piece[2].includes(SIDE));
	POSIBLE_CAPTURE_1 = POSIBLE_CAPTURES.filter((piece) => {
		return (
			MX - piece[0] === (MY - piece[1]) * -1 &&
			MX > piece[0] &&
			MY < piece[1] &&
			NUMBERS.includes(piece[0] - 1) &&
			NUMBERS.includes(piece[1] + 1)
		);
	});
	POSIBLE_CAPTURE_2 = POSIBLE_CAPTURES.filter((piece) => {
		return (
			MX - piece[0] === MY - piece[1] &&
			MX < piece[0] &&
			MY < piece[1] &&
			NUMBERS.includes(piece[0] + 1) &&
			NUMBERS.includes(piece[1] + 1)
		);
	});
	POSIBLE_CAPTURE_3 = POSIBLE_CAPTURES.filter((piece) => {
		return (
			(MX - piece[0]) * -1 === MY - piece[1] &&
			MX < piece[0] &&
			MY > piece[1] &&
			NUMBERS.includes(piece[0] + 1) &&
			NUMBERS.includes(piece[1] - 1)
		);
	});
	POSIBLE_CAPTURE_4 = POSIBLE_CAPTURES.filter((piece) => {
		return (
			MX - piece[0] === MY - piece[1] &&
			MX > piece[0] &&
			MY > piece[1] &&
			NUMBERS.includes(piece[0] - 1) &&
			NUMBERS.includes(piece[1] - 1)
		);
	});
	var EMPTY_CAPTURE_1 = "no";
	var EMPTY_CAPTURE_2 = "no";
	var EMPTY_CAPTURE_3 = "no";
	var EMPTY_CAPTURE_4 = "no";

	if (POSIBLE_CAPTURE_1.length > 0) {
		POSIBLE_CAPTURE_1.splice(1);
		POSIBLE_CAPTURE_1 = POSIBLE_CAPTURE_1.flat();
		EMPTY_CAPTURE_1 = pieces
			.filter(
				(piece) =>
					piece[0] === POSIBLE_CAPTURE_1[0] - 1 && piece[1] === POSIBLE_CAPTURE_1[1] + 1
			)
			.toString();
	}

	if (POSIBLE_CAPTURE_2.length > 0) {
		POSIBLE_CAPTURE_2.splice(1);
		POSIBLE_CAPTURE_2 = POSIBLE_CAPTURE_2.flat();
		EMPTY_CAPTURE_2 = pieces
			.filter(
				(piece) =>
					piece[0] === POSIBLE_CAPTURE_2[0] + 1 && piece[1] === POSIBLE_CAPTURE_2[1] + 1
			)
			.toString();
	}

	if (POSIBLE_CAPTURE_3.length > 0) {
		POSIBLE_CAPTURE_3.splice(1);
		POSIBLE_CAPTURE_3 = POSIBLE_CAPTURE_3.flat();
		EMPTY_CAPTURE_3 = pieces
			.filter(
				(piece) =>
					piece[0] === POSIBLE_CAPTURE_3[0] + 1 && piece[1] === POSIBLE_CAPTURE_3[1] - 1
			)
			.toString();
	}

	if (POSIBLE_CAPTURE_4.length > 0) {
		POSIBLE_CAPTURE_4.splice(1);
		POSIBLE_CAPTURE_4 = POSIBLE_CAPTURE_4.flat();
		EMPTY_CAPTURE_4 = pieces
			.filter(
				(piece) =>
					piece[0] === POSIBLE_CAPTURE_4[0] - 1 && piece[1] === POSIBLE_CAPTURE_4[1] - 1
			)
			.toString();
	}
	if (!!!EMPTY_CAPTURE_1) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_1);
	}
	if (!!!EMPTY_CAPTURE_2) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_2);
	}
	if (!!!EMPTY_CAPTURE_3) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_3);
	}
	if (!!!EMPTY_CAPTURE_4) {
		PIECES_TO_CAPTURE.push(POSIBLE_CAPTURE_4);
	}
	return PIECES_TO_CAPTURE;
}

export function queenResults(newPiecePosition) {
	const state = store.getState();
	var moved = true;
	var newBoard = state.checkersPlay.present.filter(
		(piece) => newPiecePosition[3] !== piece[3]
	);
	if (
		POSIBLE_CAPTURE_1.length > 0 &&
		newPiecePosition[0] < POSIBLE_CAPTURE_1[0] &&
		newPiecePosition[1] > POSIBLE_CAPTURE_1[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_1[3] !== piece[3]);
		const chain = queenCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	} else if (
		POSIBLE_CAPTURE_2.length > 0 &&
		newPiecePosition[0] > POSIBLE_CAPTURE_2[0] &&
		newPiecePosition[1] > POSIBLE_CAPTURE_2[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_2[3] !== piece[3]);
		const chain = queenCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	} else if (
		POSIBLE_CAPTURE_3.length > 0 &&
		newPiecePosition[0] > POSIBLE_CAPTURE_3[0] &&
		newPiecePosition[1] < POSIBLE_CAPTURE_3[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_3[3] !== piece[3]);
		const chain = queenCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	} else if (
		POSIBLE_CAPTURE_4.length > 0 &&
		newPiecePosition[0] < POSIBLE_CAPTURE_4[0] &&
		newPiecePosition[1] < POSIBLE_CAPTURE_4[1]
	) {
		newBoard = newBoard.filter((piece) => POSIBLE_CAPTURE_4[3] !== piece[3]);
		const chain = queenCanCapture(newPiecePosition, newBoard);
		if (chain.length > 0) {
			moved = false;
		}
	} else {
		moved = true;
	}
	newBoard.push(newPiecePosition);
	setNewMove(newBoard, moved);
}
