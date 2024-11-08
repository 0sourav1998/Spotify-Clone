import mongoose from "mongoose"

export const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log(error)
    }
}