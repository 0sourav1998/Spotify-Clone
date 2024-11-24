import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true 
    },
    imageUrl : { 
        type : String ,
        required : true 
    },
    clerkId : {
        type : String,
        required : true ,
        unique : true 
    },
    playlists : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Playlist"
    }]
},{timestamps : true});

const User = mongoose.model("User",userSchema);

export default User ;