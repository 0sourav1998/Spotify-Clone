import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "@/types";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    initializeQueue(state, action: PayloadAction<Song[]>) {
      state.queue = action.payload;
      state.currentSong = state.currentSong || action.payload[0];
      state.currentIndex = state.currentIndex === -1 ? 0 : state.currentIndex;
    },
    playAlbum(state, action: PayloadAction<{ songs: Song[]; startIndex: number }>) {
      const { songs, startIndex } = action.payload;
      if (songs.length === 0) return;
      state.queue = songs;
      state.currentSong = songs[startIndex];
      state.currentIndex = startIndex;
      state.isPlaying = true;
    },
    setCurrentSong(state, action: PayloadAction<Song | null>) {
      const song = action.payload;
      if (!song) return;
      const songIndex = state.queue.findIndex((s) => s._id === song._id);
      state.currentSong = song;
      state.isPlaying = true;
      state.currentIndex = songIndex !== -1 ? songIndex : state.currentIndex;
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    playNext(state) {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex < state.queue.length) {
        state.currentSong = state.queue[nextIndex];
        state.currentIndex = nextIndex;
        state.isPlaying = true;
      } else {
        state.isPlaying = false;
      }
    },
    setIsPlaying : (state)=>{
      state.isPlaying = true ;
    },
    playPrevious(state) {
      const prevIndex = state.currentIndex - 1;
      if (prevIndex >= 0) {
        state.currentSong = state.queue[prevIndex];
        state.currentIndex = prevIndex;
        state.isPlaying = true;
      } else {
        state.isPlaying = false;
      }
    },
    resetPlayState: (state) => {
      state.isPlaying = false;
    },
  },
});

export const {
  initializeQueue,
  playAlbum,
  setCurrentSong,
  togglePlay,
  playNext,
  setIsPlaying,
  playPrevious,
  resetPlayState
} = playerSlice.actions;

export default playerSlice.reducer;
