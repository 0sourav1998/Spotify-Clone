import express from "express";
const app = express();
import dotenv from "dotenv";
import { connectToDB } from "./database/config.js";
dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 4000 ;

await connectToDB();

app.listen(PORT,()=>{
    console.log(`App is Listening to PORT ${PORT}`)
})