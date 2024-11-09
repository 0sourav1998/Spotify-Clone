import mongoose from "mongoose";

const songSchema = new mongoose.model({
    title : {
        type : String,
        required : true
    },
    artist : {
        type : String,
        required : true 
    } ,
    imageUrl : {
        type :String ,
        required : true
    } ,
    audioUrl : {
        type : String ,
        required : true
    } ,
    duration  : {
        type : Number,
        required : true
    },
    album : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Album"
    }
},{timestamps : true});

const Song = mongoose.model("Song",songSchema);
export default Song ;