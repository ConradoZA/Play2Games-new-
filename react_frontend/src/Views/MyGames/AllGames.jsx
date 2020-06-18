import React from "react";
import { useEffect } from "react";
import { getAllGames } from "../../Redux/actions/checkerGames";
import CheckerSkeleton from "./CheckerSkeleton";
import { connect } from "react-redux";

const AllGames = ({ allCheckersGame, user }) => {
	const username = user.name;
	const stillPlaying = allCheckersGame.filter((game) => game.winner === "");
	useEffect(() => {
		getAllGames();
	}, []);

	return (
		<>
			{stillPlaying.map((game) => {
				return <CheckerSkeleton game={game} name={username} key={game._id} />;
			})}
		</>
	);
};
const mapStateToProps = (state) => ({
	allCheckersGame: state.allCheckersGame.all,
	user: state.user.user,
});
export default connect(mapStateToProps)(AllGames);
