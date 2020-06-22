import React from "react";
import { useEffect } from "react";
import { getAllGames } from "../../Redux/actions/checkerGames";
import CheckerSkeleton from "./CheckerSkeleton";
import { connect } from "react-redux";
import { API_URL_IMAGES } from "../../api-config";

const AllGames = ({ allCheckersGame, user }) => {
	const username = user.name;
	const stillPlaying = allCheckersGame.filter((game) => game.winner === "");
	useEffect(() => {
		getAllGames();
	}, []);
	console.log(stillPlaying);
	return (
		<div className='flex-column center'>
			{stillPlaying.map((game) => {
				return <CheckerSkeleton game={game} name={username} key={game._id} />;
			})}
			{stillPlaying.length === 0 && (
				<img src={API_URL_IMAGES + "no_game.png"} alt='' className='img-home' />
			)}
		</div>
	);
};
const mapStateToProps = (state) => ({
	allCheckersGame: state.allCheckersGame.all,
	user: state.user.user,
});
export default connect(mapStateToProps)(AllGames);
