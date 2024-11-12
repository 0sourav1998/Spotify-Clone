import apiConnector from "@/services/apiConnector";
import { userEndpoints } from "@/services/apis";


const {GET_USERS} = userEndpoints ;


export const getAllUser = async(token : any) : Promise<any>=>{
    let result ;
    try {
        const res = await apiConnector({method : "GET" , url : GET_USERS , headers : {
            Authorization : `Bearer ${token}`
        }});
        if(res?.data?.success){
            result = res.data.users ;
        }
    } catch (error) {
        console.log(error)
    }
    return result ;
}