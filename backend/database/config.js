import mongoose from "mongoose"


export const connectToDB = async()=>{
    try {
        const uri = process.env.MONGO_URI ;

        if (!uri) {
            console.error("MongoDB URI is not defined");
            return;
          }

        await mongoose.connect(uri);
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log(error.message)
    }
}