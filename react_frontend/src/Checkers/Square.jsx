import React from "react";
import { useDrop } from "react-dnd";
import "./checkers.css";
import { canMove, move } from "./Rules/GameRules";
import Overlay from "./Overlay";

const Square = ({ x, y, children }) => {
	const backgroundColor = (x + y) % 2 === 0 ? "black" : "white";
	const TYPES = ["pawn", "queen"];
	const [{ isOver, canDrop }, drop] = useDrop({
		accept: TYPES,
		canDrop: (item) => canMove(x, y, item),
		drop: (item) => move(x, y, item),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		}),
	});

	return (
		<div ref={drop}>
			<div className={backgroundColor}>{children}</div>
			{isOver && !canDrop && <Overlay color='red' />}
			{!isOver && canDrop && <Overlay color='yellow' />}
			{isOver && canDrop && <Overlay color='green' />}
		</div>
	);
};

export default Square;
