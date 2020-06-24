import React from "react";
import { useDrag } from "react-dnd";
import "./checkers.css";
import { API_URL_IMAGES } from "../api-config";
import { checkTurn } from "./Rules/GameRules";

const BPawn = ({ color, id, hasToCapture }) => {
	const myTurn = checkTurn(id);
	const [{ canDrag, isDragging }, drag] = useDrag({
		canDrag: myTurn.includes("b"),
		item: { type: "pawn", id: id },
		collect: (monitor) => ({
			canDrag: !!monitor.canDrag(),
			isDragging: !!monitor.isDragging(),
		}),
	});
	return (
		<div
			color={color}
			id={id}
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				cursor: canDrag ? (isDragging ? "grabbing" : "grab") : "not-allowed",
			}}>
			{hasToCapture && myTurn ? (
				<img
					className='pieceSize capture'
					src={API_URL_IMAGES + "images/peon rojo.png"}
					alt=''
				/>
			) : (
				<img className='pieceSize' src={API_URL_IMAGES + "images/peon rojo.png"} alt='' />
			)}
		</div>
	);
};
export default BPawn;
