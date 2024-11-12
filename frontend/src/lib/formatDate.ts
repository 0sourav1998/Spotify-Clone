export const formatDate = (seconds : number)=>{
        const minute = Math.floor(seconds/60);
        const remainingSeconds  =  seconds % 60 ;
        return `${minute} : ${remainingSeconds.toString().padStart(2,"0")}`
        
}