import apiConnector from "@/services/apiConnector";
import { statEndpoint } from "@/services/apis"

const {FETCH_STATS} = statEndpoint ;

export const fetchStats = async(token:string)=>{
    let result ;
    try {
      const response = await apiConnector({
        method : "GET",
        url : FETCH_STATS ,
        headers : {
            Authorization : `Bearer ${token}`
        }
      });
      if(response && response.data.success){
        result = response.data ;
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }
    return result ;
  }
  