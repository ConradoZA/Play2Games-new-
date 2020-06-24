import React from "react";
import "../../Checkers/checkers.css";
import { API_URL_IMAGES } from "../../api-config";

const RecordBoard = ({ tablePosition }) => {
	const SQUARES = [];

	const renderIfThereIsPiece = (x, y) => {
		const piece = tablePosition?.map((piece) => {
			if (x === piece[0] && y === piece[1]) {
				switch (piece[2]) {
					case "wp":
						return (
							<img
								src={API_URL_IMAGES + "images/peon blanco.png"}
								alt=''
								className='pieceSize'
								key={piece[3]}
							/>
						);
					case "wq":
						return (
							<img
								src={API_URL_IMAGES + "images/dama blanca.png"}
								alt=''
								className='pieceSize'
								key={piece[3]}
							/>
						);
					case "bp":
						return (
							<img
								src={API_URL_IMAGES + "images/peon rojo.png"}
								alt=''
								className='pieceSize'
								key={piece[3]}
							/>
						);
					case "bq":
						return (
							<img
								src={API_URL_IMAGES + "images/dama roja.png"}
								alt=''
								className='pieceSize'
								key={piece[3]}
							/>
						);
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
		const backgroundColor = (X + Y) % 2 === 0 ? "black" : "white";
		return (
			<div className={backgroundColor} key={i}>
				{hasPiece}
			</div>
		);
	};
	const createBoard = () => {
		for (let i = 99; i >= 0; i--) {
			SQUARES.push(addSquare(i));
			if (i === 0) {
				return SQUARES;
			}
		}
	};
	return (
		<div className='container'>
			<div className='board'>{createBoard()}</div>
		</div>
	);
};

export default RecordBoard;
