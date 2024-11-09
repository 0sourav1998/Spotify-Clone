import { clerkClient } from "@clerk/express";

export const isLoggedIn = async(req,res,next)=>{
    try {
        if(req.auth.userId){
            return res.status(400).json({
                success : false ,
                message : "User Not Authenticated"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Internal Server error"
        })
    }
} 

export const isAdmin = async(req,res,next)=>{
    try {
        const currentUSer = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin  = process.env.ADMIN_EMAIL_ADDRESS === currentUSer.primaryEmailAddress.emailAddress;
        if(!isAdmin){
            return res.status(400).json({
                success : false ,
                message : "You are not an Admin"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Internal Server error"
        })
    }
}