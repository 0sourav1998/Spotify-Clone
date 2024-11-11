import { createSlice } from '@reduxjs/toolkit'
import { Albums , Song } from '@/types/index';

interface MusicState{
    albums : Albums[],
    songs : Song[] ,
    singleAlbum : Albums | null
}

const initialState : MusicState = {
    albums : [] ,
    songs : [] ,
    singleAlbum : null
}
const musicSlice = createSlice({
    name : "music",
    initialState ,
    reducers : { 
        setAlbums : (state,action)=>{
            state.albums = action.payload
        },
        setSongs : (state,action)=>{
            state.songs = action.payload
        } ,
        setSingleAlbum : (state,action)=>{
            state.singleAlbum = action.payload ;
        }
    }
});

export const {setAlbums,setSongs,setSingleAlbum} = musicSlice.actions;

export default musicSlice.reducer ;