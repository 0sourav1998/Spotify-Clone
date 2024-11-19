import { createSlice , PayloadAction} from "@reduxjs/toolkit";
import {Socket} from "socket.io-client"

interface initialStateType {
    socket : Socket | null,
}

const initialState : initialStateType = {
    socket : null ,
}

const socketSlice = createSlice({
    name : "socket",
    initialState ,
    reducers : {
        setSocket : (state,action:PayloadAction<Socket | null>)=>{
            return {
                ...state,
                socket: action.payload,
              };
        }
    }
})

export default socketSlice.reducer ;
export const {setSocket} = socketSlice.actions ;