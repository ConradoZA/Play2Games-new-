const initialState = {
	id:"",
	turn: 0,
	moved:false,
	past: [],
	present: [],
	whitePCaptured: 0,
	blackPCaptured: 0,
	captureTimer: 0,
};

const allInfoCheckersReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case "SET_PLAY":
			return {
				id:action.id,
				past: action.past,
				present: action.present,
				turn: action.turn,
				moved:false,
				whitePCaptured: action.whitePCaptured,
				blackPCaptured: action.blackPCaptured,
				captureTimer: action.captureTimer,
			};
		case "UNSET_PLAY":
			return {
				id:"",
				turn: 0,
				moved:false,
				past: [],
				present: [],
				whitePCaptured: 0,
				blackPCaptured: 0,
				captureTimer: 0,
			};
		case "SET_TABLE_POSITION":
			return {
				...state,
				moved:action.moved,
				present: action.present,
			};

		default:
			return state;
	}
};
export default allInfoCheckersReducer;
