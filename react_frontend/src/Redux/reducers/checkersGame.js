const initialState = {
	unset: true,
};

const checkersGameReducer = (state = initialState, action = {}) => {
	switch (action.type) {

		case "SET_GAME":
			return {
				id:action.id,
				playerOne: action.playerOne,
				playerTwo: action.playerTwo,
				initiated: action.initiated,
				winner: action.winner,
				drawOffered: action.drawOffered,
			};
		case "UNSET_GAME":
			return {
				unset: true,
			};
		default:
			return state;
	}
};
export default checkersGameReducer;
