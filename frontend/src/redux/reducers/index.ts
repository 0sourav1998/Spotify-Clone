import { combineReducers } from "@reduxjs/toolkit";
import musicReducer from "../slice/Music/Music";
import userReducer from "../slice/User/User";
import playerReducer from "../slice/Music/PlayerStore";
const rootReducer = combineReducers({
  music: musicReducer,
  user: userReducer,
  player: playerReducer,
});
export default rootReducer;
