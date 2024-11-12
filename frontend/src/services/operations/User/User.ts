import apiConnector from "@/services/apiConnector";
import { userEndpoints } from "@/services/apis";


const {GET_USERS,IS_ADMIN} = userEndpoints ;


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

export const isUserAdminFunction = async(token : any) : Promise<any>=>{
    let result ;
    try {
        const res = await apiConnector({method : "GET" , url :  IS_ADMIN, headers : {
            Authorization : `Bearer ${token}`
        }});
        console.log(res)
        if(res){
            result = res.data.admin;
        }
    } catch (error) {
        console.log(error)
    }
    return result ;
}