import React, { useEffect } from "react";
import { getAllGames } from "../../Redux/actions/checkerGames";
import CheckerSkeleton from "./CheckerSkeleton";
import { connect } from "react-redux";
import { API_URL_IMAGES } from "../../api-config";

const AllGames = ({ allCheckersGame, user }) => {
	const username = user.name;
	const stillPlaying = allCheckersGame.filter((game) => game.winner === "");
	stillPlaying.sort((a, b) => {
		if (a.initiated && b.initiated) {
			if (
				(a.gamePlay.turn % 2 === 0 && a.playerTwo === username) ||
				(a.gamePlay.turn % 2 === 1 && a.playerOne === username)
			) {
				return -1;
			}
			return b.gamePlay["updatedAt"] - a.gamePlay["updatedAt"];
		}
		if (!a.initiated && a.playerTwo === username) {
			return -1;
		}
		return a.updatedAt - b.updatedAt;
	});
	useEffect(() => {
		getAllGames();
	}, []);
	return (
		<div className='flex-column center'>
			{stillPlaying.length === 0 && (
				<img src={API_URL_IMAGES + "images/no_game.png"} alt='' className='img-home' />
			)}
			{stillPlaying.map((game) => {
				return <CheckerSkeleton game={game} name={username} key={game._id} />;
			})}
		</div>
	);
};
const mapStateToProps = (state) => ({
	allCheckersGame: state.allCheckersGame.all,
	user: state.user.user,
});
export default connect(mapStateToProps)(AllGames);
