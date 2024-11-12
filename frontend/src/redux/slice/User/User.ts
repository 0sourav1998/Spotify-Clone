import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface userInterface {
    users : User[],
}

const initialState : userInterface = {
    users : [],
}

const useSlice  = createSlice({
    name : "user",
    initialState ,
    reducers : {
        setUsers : (state,acton)=>{
            state.users = acton.payload
        }
    }
})

export const {setUsers} = useSlice.actions ;

export default useSlice.reducer ;