import store from "../store";
import { API_URL_1 } from "../../api-config";
import Axios from "axios";

export const setNewMove = (tablePosition, moved) => {
	store.dispatch({
		type: "SET_TABLE_POSITION",
		moved:moved,
		present: tablePosition,
	});
};
export const getPlay = async (playId) => {
	const res = await Axios.get(API_URL_1 + "checkers/plays/get=" + playId);
	return res;
};
export const sendMoveToOponent = (newTurn) => {
	const res = Axios.put(API_URL_1 + "checkers/plays/new-turn", newTurn);
	return res;
};