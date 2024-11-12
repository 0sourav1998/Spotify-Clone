import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface userInterface {
  users: User[];
  isUserAdmin: boolean;
}

const initialState: userInterface = {
  users: [],
  isUserAdmin: false,
};

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, acton) => {
      state.users = acton.payload;
    },
    setUserIsAdmin: (state, action) => {
      state.isUserAdmin = action.payload;
    },
  },
});

export const { setUsers, setUserIsAdmin } = useSlice.actions;

export default useSlice.reducer;
