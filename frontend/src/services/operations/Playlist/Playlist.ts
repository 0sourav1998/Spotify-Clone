import apiConnector from "@/services/apiConnector";
import { playlistEndpoints } from "@/services/apis"
import { bodyType } from "@/types";
import toast from "react-hot-toast";

const {CREATE_PLAYLIST} = playlistEndpoints ;


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