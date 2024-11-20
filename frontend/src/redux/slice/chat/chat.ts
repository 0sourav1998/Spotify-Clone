import { Message , User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface initialStateType {
    users : User[],
    isConnected : boolean ,
    onlineUsers : string[] ,
    userActivities : any[],
    messages : Message[] ,
    selectedUser : User | null,
    loading : boolean
}

const initialState : initialStateType = {
    users : [] ,
    isConnected : false ,
    onlineUsers : [] ,
    userActivities : [],
    messages : [] ,
    selectedUser : null ,
    loading : false ,
}

const chatSlice = createSlice({
    name : "chat",
    initialState ,
    reducers: {
        setIsConnected(state, action: PayloadAction<boolean>) {
          state.isConnected = action.payload;
        },
        setSelectedUser(state, action: PayloadAction<User | null>) {
          state.selectedUser = action.payload;
        },
        addMessage(state, action: PayloadAction<Message[]>) {
          state.messages = action.payload ;
        },
        updateOnlineUsers(state, action: PayloadAction<string[]>) {
          state.onlineUsers = action.payload;
        },
        updateUserActivities(state, action: PayloadAction<any[]>) {
          state.userActivities = action.payload;
        },
        setLoading(state , action : PayloadAction<boolean>){
          state.loading = action.payload ;
        }
      },
})

export default chatSlice.reducer ;
export const {setIsConnected,setSelectedUser,addMessage,updateOnlineUsers,updateUserActivities,setLoading} = chatSlice.actions;