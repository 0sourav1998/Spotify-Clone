import User from "../models/user.model.js";

export const getAllUser = async(req,res)=>{
    try {
        const currentUser = req.auth.userId ;
        console.log(currentUser)
        const users = await User.find({clerkId : {$ne :currentUser}});
        return res.status(200).json({
            success: true ,
            message : "Users Fetched",
            users
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Fetching users"
        })
    }
}