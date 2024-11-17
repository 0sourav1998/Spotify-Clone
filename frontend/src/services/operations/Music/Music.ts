import apiConnector from "@/services/apiConnector";
import { musicEndpoints } from "@/services/apis";
import { Albums, Song, songType } from "@/types";

const {
  GET_ALL_ALBUMS,
  FETCH_SINGLE_ALBUM,
  FETCH_FEATURED_SONGS,
  FETCH_TRENDING_SONGS,
  FETCH_MADE_FOR_YOU,
  GET_ALL_SONGS ,
  DELETE_SONG ,
  CREATE_SONG
} = musicEndpoints;

export const fetchAllAlbums = async () => {
  let result;
  try {
    const res = await apiConnector({ method: "GET", url: GET_ALL_ALBUMS });
    result = res?.data.allAlbum;
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
    console.log("RESPONSE",res)
    if (res?.data?.success) {
      result = res.data.songs;
    }
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error)
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
      result = response.data.allSongs
    }
  } catch (error) {
    console.log(error)
  }
  return result ;
}
