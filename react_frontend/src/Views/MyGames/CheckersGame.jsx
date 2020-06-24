import React, { useEffect, useState } from "react";
import Board from "../../Checkers/Board";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { getPlay, sendMoveToOponent } from "../../Redux/actions/checkerPlays";
import { unsetGame } from "../../Redux/actions/checkerGames";
import SnackBar from "../../Components/SnackBar";
import { winningCondition, doesCapture } from "../../Checkers/Rules/GameRules";

const CheckersGame = (props) => {
	let captureTimer = 0;
	const present = props.checkersPlay.present;
	const id = props.checkersPlay.id;
	const [oldMove, setOldMove] = useState([]);
	const [pastMoves, setPastMoves] = useState([]);
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("info");
	const [message, setMessage] = useState("");

	const openSnackBar = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
			setMessage("");
			setType("info");
		}, 2500);
	};

	useEffect(() => {
		getPlay(id).then((res) => {
			setOldMove(res.data.present);
			setPastMoves(res.data.past);
		});
	}, [id]);
	const doesMove = (arr1, arr2) => {
		const last1 = arr1[arr1.length - 1];
		const last2 = arr2[arr2.length - 1];
		let result = false;
		for (const [index, value] of last1.entries()) {
			if (value !== last2[index]) {
				result = true;
				break;
			}
		}
		return result;
	};

	const sendMove = () => {
		if (doesMove(present, oldMove)) {
			const turn = props.checkersPlay.turn + 1;
			if (doesCapture(present, oldMove)) {
				captureTimer = 0;
			} else {
				captureTimer = props.checkersPlay.captureTimer + 1;
			}
			const whitePCaptured =
				20 - present.filter((piece) => piece[2].includes("w")).length;
			const blackPCaptured =
				20 - present.filter((piece) => piece[2].includes("b")).length;
			pastMoves.push(present);
			const newTurn = {
				id,
				turn,
				past: pastMoves,
				present,
				whitePCaptured,
				blackPCaptured,
				captureTimer,
			};
			sendMoveToOponent(newTurn).then((_res) => {
				winningCondition();
				unsetGame();
			});
		} else {
			setMessage("No has movido");
			setType("error");
			openSnackBar();
		}
	};

	return (
		<DndProvider options={HTML5toTouch}>
			<div className='flex-column center'>
				<Button variant='contained' color='secondary' onClick={sendMove}>
					Enviar Movimiento
				</Button>
				<br />
				<div className='container'>
					<Board />
				</div>
			</div>
			<SnackBar type={type} open={open} message={message} />
		</DndProvider>
	);
};

const mapStateToProps = (state) => ({ checkersPlay: state.checkersPlay });
export default connect(mapStateToProps)(CheckersGame);
