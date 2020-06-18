import { combineReducers } from "redux";
import user from "./user";
import allCheckersGame from "./allCheckersGame";
import checkersGame from "./checkersGame";
import checkersPlay from "./checkersPlay";

const reducer = combineReducers({
    user,
    allCheckersGame,
    checkersGame,
    checkersPlay
})
export default reducer;