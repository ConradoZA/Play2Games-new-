import React from "react";
import { connect } from "react-redux";
import Square from "./Square.jsx";
import WPawn from "./WPawn";
import WQueen from "./WQueen";
import BPawn from "./BPawn";
import BQueen from "./BQueen";
import "./checkers.css";
import { whitePawnCanCapture } from "./Rules/WhitePawnMoves";
import { blackPawnCanCapture } from "./Rules/BlackPawnMoves.js";
import { queenCanCapture } from "./Rules/QueenMoves.js";

const Board = (props) => {
	let tablePosition = props.checkersPlay.present;
	const turn = props.checkersPlay.turn;
	const SQUARES = [];

	const renderIfThereIsPiece = (x, y) => {
		const piece = tablePosition.map((piece) => {
			const id = piece[3];
			var hasToCapture = false;
			if (x === piece[0] && y === piece[1]) {
				switch (piece[2]) {
					case "wp":
						if (whitePawnCanCapture(piece, tablePosition).length > 0) {
							hasToCapture = true;
						}
						return <WPawn color={"wp"} id={id} key={id} hasToCapture={hasToCapture} />;
					case "wq":
						if (queenCanCapture(piece, tablePosition).length > 0) {
							hasToCapture = true;
						}
						return <WQueen color={"wq"} id={id} key={id} hasToCapture={hasToCapture} />;
					case "bp":
						if (blackPawnCanCapture(piece, tablePosition).length > 0) {
							hasToCapture = true;
						}
						return <BPawn color={"bp"} id={id} key={id} hasToCapture={hasToCapture} />;
					case "bq":
						if (queenCanCapture(piece, tablePosition).length > 0) {
							hasToCapture = true;
						}
						return <BQueen color={"bq"} id={id} key={id} hasToCapture={hasToCapture} />;
					default:
						return "";
				}
			}
		});
		return piece;
	};
	const addSquare = (i) => {
		let X = i % 10;
		let Y = Math.floor(i / 10);
		const hasPiece = renderIfThereIsPiece(X, Y);
		return (
			<Square x={X} y={Y} key={i}>
				{hasPiece}
			</Square>
		);
	};
	const createWhiteBoard = () => {
		for (let i = 99; i >= 0; i--) {
			SQUARES.push(addSquare(i));
			if (i === 0) {
				return SQUARES;
			}
		}
	};
	const createBlackBoard = () => {
		for (let i = 0; i <= 99; i++) {
			SQUARES.push(addSquare(i));
			if (i === 99) {
				return SQUARES;
			}
		}
	};
	return (
		<div className='board'>
			{turn % 2 === 1 ? createWhiteBoard() : createBlackBoard()}
		</div>
	);
};

const mapStateToProps = (state) => ({
	checkersPlay: state.checkersPlay,
});
export default connect(mapStateToProps)(Board);
