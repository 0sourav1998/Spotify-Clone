import { combineReducers } from "@reduxjs/toolkit";
import musicReducer from "../slice/Music/Music";
import userReducer from "../slice/User/User";
import playerReducer from "../slice/Music/PlayerStore";
import adminReducer from "../slice/Admin/Admin"
import socketReducer  from "../slice/chat/socket"
import chatReducer from "../slice/chat/chat"

const rootReducer = combineReducers({
  music: musicReducer,
  user: userReducer,
  player: playerReducer,
  admin : adminReducer,
  socket : socketReducer ,
  chat : chatReducer
});
export default rootReducer;
