import apiConnector from "@/services/apiConnector";
import { musicEndpoints } from "@/services/apis";
import { Albums } from "@/types";

const {
  GET_ALL_ALBUMS,
  FETCH_SINGLE_ALBUM,
  FETCH_FEATURED_SONGS,
  FETCH_TRENDING_SONGS,
  FETCH_MADE_FOR_YOU,
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

export const fetchFeaturedSongs = async (token: string | null): Promise<any> => {
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
export const fetchTrendingSongs = async (token: string | null): Promise<any> => {
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
export const madeForYouSong = async (token: string | null): Promise<any> => {
  let result;
  try {
    const res = await apiConnector({
      method: "GET",
      url: FETCH_MADE_FOR_YOU,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("RESPONE",res)
    if (res?.data?.success) {
      result = res?.data?.songs;
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};
