import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Albums, Song, Stats } from "../../../types/index";

interface initialStateTypes {
  songs: Song[];
  albums: Albums[];
  stats: Stats;
}

const initialState: initialStateTypes = {
  songs: [],
  albums: [],
  stats: {
    songCount: 0,
    albumCount: 0,
    userCount: 0,
    uniqueArtistCount: 0,
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAllSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    setAllAlbums: (state, action: PayloadAction<Albums[]>) => {
      state.albums = action.payload;
    },
    setStats : (state,action:PayloadAction<Stats>)=>{
      state.stats = action.payload
    }
  },
});

export const { setAllAlbums, setAllSongs , setStats } = adminSlice.actions;
export default adminSlice.reducer;
