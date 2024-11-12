import { combineReducers } from "@reduxjs/toolkit";
import musicReducer from "../slice/Music/Music"
import userReducer from "../slice/User/User"

const rootReducer = combineReducers({
    music : musicReducer ,
    user : userReducer
});
export default rootReducer ;