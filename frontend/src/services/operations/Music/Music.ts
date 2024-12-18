import apiConnector from "@/services/apiConnector";
import { musicEndpoints } from "@/services/apis";
import { Albums, Song } from "@/types";
import toast from "react-hot-toast";

const {
  GET_ALL_ALBUMS,
  FETCH_SINGLE_ALBUM,
  FETCH_FEATURED_SONGS,
  FETCH_TRENDING_SONGS,
  FETCH_MADE_FOR_YOU,
  GET_ALL_SONGS ,
  DELETE_SONG ,
  CREATE_SONG ,
  CREATE_ALBUM ,
  DELETE_ALBUM
} = musicEndpoints;

export const fetchAllAlbums = async () => {
  let result;
  try {
    const res = await apiConnector({ method: "GET", url: GET_ALL_ALBUMS });
    result = res?.data.allAlbum;
  } catch (error:any) {
    toast.error(error.res.data.message)
  }
  return result;
};

export const fetchSingleAlbum = async (id: string): Promise<Albums> => {
  let result;
  try {
    const NEW_URL = FETCH_SINGLE_ALBUM.replace(":id", id);
    const res = await apiConnector({ method: "GET", url: NEW_URL });
    if (res?.data.success) {
      result = res?.data?.album;
    }
  } catch (error:any) {
    toast.error(error.res.data.message)
  }
  return result;
};

export const fetchFeaturedSongs = async (token: string | null): Promise<Song[]> => {
  let result;
  try {
    const res = await apiConnector({
      method: "GET",
      url: FETCH_FEATURED_SONGS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data?.success) {
      result = res.data.songs;
    }
  } catch (error:any) {
    toast.error(error.res.data.message)
  }
  return result;
};
export const fetchTrendingSongs = async (token: string | null): Promise<Song[]> => {
  let result;
  try {
    const res = await apiConnector({
      method: "GET",
      url: FETCH_TRENDING_SONGS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data?.success) {
      result = res?.data?.songs;
    }
  } catch (error:any) {
    toast.error(error.res.data.message)
  }
  return result;
};

export const madeForYouSong = async (token: string | null): Promise<Song[]> => {
  let result;
  try {
    const res = await apiConnector({
      method: "GET",
      url: FETCH_MADE_FOR_YOU,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data?.success) {
      result = res?.data?.songs;
    }
  } catch (error:any) {
    toast.error(error.res.data.message)
  }
  return result;
};

export const fetchAllSongs = async(token:string) : Promise<Song[]>=>{
  let result ;
  try {
    const response = await apiConnector({
      method : "GET",
      url : GET_ALL_SONGS,
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    if(response && response.data.success){
      result = response?.data.songs 
    }
  } catch (error:any) {
    toast.error(error.response.data.message)
  }
  return result ;
}

export const deleteSongs = async(id : string , token : string) : Promise<Song> =>{
  let result ;
  try {
    const NEW_DELETE_URL = DELETE_SONG.replace(":id",id);
    const response = await apiConnector({
      method : "DELETE",
      url : NEW_DELETE_URL,
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    if(response && response.data.success){
      result = response.data.deletedSong
    }
  } catch (error) {
    console.log(error)
  }
  return result ;
}

export const createSong = async(formData : any,token:string) : Promise<Song[]> =>{
  let result ;
  try {
    const response = await apiConnector({
      method : "POST",
      url : CREATE_SONG,
      data : formData ,
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    if(response && response.data.success){
      toast.success("Song Created Successfully");
      result = response.data.allSongs
    }
  } catch (error:any) {
    toast.error(error.response.data.message);
  }
  return result ;
}

export const createAlbum = async(formData : any,token:string) : Promise<Albums[]> =>{
  let result ;
  try {
    const response = await apiConnector({
      method : "POST",
      url : CREATE_ALBUM,
      data : formData ,
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    if(response && response.data.success){
      toast.success("Album Created Successfully");
      result = response.data.allAlbums
    }
  } catch (error : any) {
    toast.error(error.response.data.message);
  }
  return result ;
}



export const deleteAlbum = async(id : string , token : string) : Promise<Albums> =>{
  let result ;
  try {
    const NEW_DELETE_URL = DELETE_ALBUM.replace(":id",id);
    const response = await apiConnector({
      method : "DELETE",
      url : NEW_DELETE_URL,
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    if(response && response.data.success){
      result = response.data.deletedAlbum
    }
  } catch (error) {
    console.log(error)
  }
  return result ;
}
