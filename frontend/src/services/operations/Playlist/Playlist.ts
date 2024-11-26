import apiConnector from "@/services/apiConnector";
import { playlistEndpoints } from "@/services/apis"
import toast from "react-hot-toast";

const {CREATE_PLAYLIST,GET_ALL,ADD_REMOVE,GET_SINGLE} = playlistEndpoints ;


interface bodyType {
    id : string ,
    playlistId ?: string
}

export const createPlaylist = async(body : bodyType ,token : string)=>{
    try {
        const response = await apiConnector({
            method : "POST",
            url : CREATE_PLAYLIST ,
            data : body ,
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        if(response && response.data.success){
            console.log(response)
            toast.success(response.data.message)
        }
    } catch (error:any) {
        toast.error(error.data?.message)
    }
}

export const allPlayLists = async(token : string)=>{
    let result ;
    try {
        const response = await apiConnector({
            method : "GET",
            url : GET_ALL ,
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        if(response && response.data.success){
            result = response.data.allPlaylists
        }
    } catch (error:any) {
        toast.error(error.data?.message)
    }
    return result ;
}


export const addOrRemoveSong = async(body : bodyType , token : string) =>{
    let result ;
    try {
        const res = await apiConnector({
            method : "POST" ,
            url : ADD_REMOVE ,
            data : body ,
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        if(res && res.data.success){
            toast.success(res.data.message)
        }
    } catch (error:any) {
        toast.error(error)
    }
    return result ;
}

export const fetchSinglePlaylist = async(id : string ,token : string)=>{
    let result ;
    try {
        const res = await apiConnector({
            method : "POST",
            url : GET_SINGLE ,
            data : {playlistId : id},
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        if(res && res.data.success){
            console.log("res",res)
            result = res.data.singlePlaylist
        }
    } catch (error : any) {
        console.log(error.message)
    }
    return result ;
}

