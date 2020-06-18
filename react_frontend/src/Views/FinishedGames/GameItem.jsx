import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useParams } from "react-router-dom";
import { getOneGame } from "../../Redux/actions/checkerGames";
import RecordBoard from "./RecordBoard";
import "../../index.css";

const GameItem = () => {
	const slug = useParams();
	const gameId = slug.gameId;
	const [page, setPage] = useState(1);
	const [past, setPast] = useState([]);
	const [turns, setTurns] = useState(1);

	useEffect(() => {
		getOneGame(gameId).then((res) => {
			setPast(res.data.gamePlay.past);
			setTurns(res.data.gamePlay.past.length);
		});
	}, [gameId]);

	const handlePage = (event, value) => {
		setPage(value);
	};

	return (
		<div className='flex-column center'>
			<RecordBoard tablePosition={past[page - 1]} />
			<Pagination
				color='primary'
				count={turns}
				page={page}
				onChange={handlePage}
				siblingCount={2}
			/>
		</div>
	);
};

export default GameItem;
