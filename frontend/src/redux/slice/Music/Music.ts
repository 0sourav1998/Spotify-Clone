import { createSlice } from '@reduxjs/toolkit'
import { Albums , Playlist, Song } from '@/types/index';


interface MusicState{
    albums : Albums[],
    songs : Song[] ,
    singleAlbum : Albums | null ,
    featuredSongs : Song[],
    madeForYouSongs : Song[],
    trendingSongs : Song[] ,
    allPlaylists : Playlist[] ,
    singlePlaylist : Playlist | null
}

const initialState : MusicState = {
    albums : [] ,
    songs : [] ,
    singleAlbum : null ,
    featuredSongs : [] ,
    madeForYouSongs : [] ,
    trendingSongs : [] ,
    allPlaylists : [],
    singlePlaylist : null
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
        } ,
        setTrendingSongs : (state,action)=>{
            state.trendingSongs = action.payload
        } ,
        setFeaturedSongs : (state,action)=>{
            state.featuredSongs = action.payload
        } ,
        setMadeForYouSongs : (state,action)=>{
            state.madeForYouSongs = action.payload
        } ,
        setAllPlaylists : (state,action)=>{
            state.allPlaylists = action.payload ;
        } ,
        setSinglePlaylist : (state,action)=>{
            state.singlePlaylist = action.payload
        }
    }
});

export const {setAlbums,setSongs,setSingleAlbum,setFeaturedSongs,setMadeForYouSongs,setTrendingSongs,setAllPlaylists,setSinglePlaylist} = musicSlice.actions;

export default musicSlice.reducer ;