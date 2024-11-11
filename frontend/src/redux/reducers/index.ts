import { combineReducers } from "@reduxjs/toolkit";
import musicReducer from "../slice/Music/Music"

const rootReducer = combineReducers({
    music : musicReducer
});
export default rootReducer ;