import { Message , User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface initialStateType {
    users : User[],
    isConnected : boolean ,
    onlineUsers : string[] ,
    userActivities : Map<string,string>,
    messages : Message[] ,
    selectedUser : User | null,

}

const initialState : initialStateType = {
    users : [] ,
    isConnected : false ,
    onlineUsers : [] ,
    userActivities : new Map(),
    messages : [] ,
    selectedUser : null ,
}

const chatSlice = createSlice({
    name : "chat",
    initialState ,
    reducers: {
        
        setIsConnected(state, action: PayloadAction<boolean>) {
          state.isConnected = action.payload;
        },
        setSelectedUser(state, action: PayloadAction<User>) {
          state.selectedUser = action.payload;
        },
        addMessage(state, action: PayloadAction<Message[]>) {
          state.messages = action.payload ;
        },
        updateOnlineUsers(state, action: PayloadAction<string[]>) {
          state.onlineUsers = action.payload;
        },
        updateUserActivities(state, action: PayloadAction<Map<string, string>>) {
          state.userActivities = action.payload;
        },
      },
})

export default chatSlice.reducer ;
export const {setIsConnected,setSelectedUser,addMessage,updateOnlineUsers,updateUserActivities} = chatSlice.actions;