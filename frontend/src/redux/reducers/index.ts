import { combineReducers } from "@reduxjs/toolkit";
import musicReducer from "../slice/Music/Music";
import userReducer from "../slice/User/User";
import playerReducer from "../slice/Music/PlayerStore";
import adminReducer from "../slice/Admin/Admin"
const rootReducer = combineReducers({
  music: musicReducer,
  user: userReducer,
  player: playerReducer,
  admin : adminReducer
});
export default rootReducer;
