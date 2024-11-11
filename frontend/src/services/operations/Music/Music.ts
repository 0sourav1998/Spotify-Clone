import apiConnector from "@/services/apiConnector";
import { musicEndpoints } from "@/services/apis"
import { Albums } from "@/types";

const {GET_ALL_ALBUMS,FETCH_SINGLE_ALBUM} = musicEndpoints;

export const fetchAllMusics = async()=>{
    try {
        
    } catch (error) {
        
    }
}
export const fetchAllAlbums = async()=>{
    let result ;
    try {
        const res = await apiConnector({method : "GET" , url : GET_ALL_ALBUMS });
        result = res?.data.allAlbum ;
    } catch (error) {
        console.log(error)
    }
    return result ;
}

export const fetchSingleAlbum = async(id : string) : Promise<Albums>=>{
    let result ;
    try {
        const NEW_URL = FETCH_SINGLE_ALBUM.replace(":id",id)
        const res = await apiConnector({method : "GET",url : NEW_URL});
        if(res?.data.success){
           result = res?.data?.album
        }
    } catch (error) {
        console.log(error)
    }
    return result ;
}