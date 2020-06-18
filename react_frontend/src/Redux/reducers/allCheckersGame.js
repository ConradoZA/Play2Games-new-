const initialState = {
	all: [],
};

const allInfoCheckersReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case "ALL_GAMES":
			return {
				...state,
				all: action.payload,
			};
		case "NEW_INVITATION":
			return {
				...state,
				all: [...state.all, action.payload],
			};

		default:
			return state;
	}
};
export default allInfoCheckersReducer;
