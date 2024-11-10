import User from "../models/user.model.js";

export const authFunction = async(req,res)=>{
    const {id , firstName , lastName ,imageUrl} = req.body ;
    try {
        const existingUser = await User.findOne({clerkId : id});
        let newUser ;
        if(!existingUser){
            newUser = await User.create({
                clerkId : id ,
                name : `${firstName} ${lastName}`,
                imageUrl : imageUrl
            })
        };
        return res.status(200).json({
            success : true ,
            user : existingUser ? existingUser : newUser
        })
    } catch (error) {
        console.error(error.message)
        return res.status(400).json({
            success : false ,
            message : "Error While Login/Signup"
        })
    }
}