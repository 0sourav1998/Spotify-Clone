import apiConnector from "@/services/apiConnector";
import { messageEndpoints } from "@/services/apis"

interface bodyType {
    message : string ,
    receiverId : string 
}


const {GET_ALL ,SEND_MESSAGE} = messageEndpoints ;

export const getAllMessages = async(id:string,token : string | null)=>{
    let result ;
    try {
        const NEW_URL = GET_ALL.replace(":id",id);
        const res = await apiConnector({
            method : "GET",
            url : NEW_URL ,
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        console.log(res)
        if(res && res.data.success){
            result = res.data.messages
        }
    } catch (error:any) {
        console.log(error.message)
    }
    return result ;
}

export const sendMessage = async(body : bodyType,token : string | null)=>{
    let result ;
    try {
        const res = await apiConnector({
            method : "POST",
            url : SEND_MESSAGE ,
            data : body ,
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        if(res && res.data.success){
            result = res.data.populatedMessage
        }
    } catch (error) {
        console.log(error)
    }
    return result ;
}