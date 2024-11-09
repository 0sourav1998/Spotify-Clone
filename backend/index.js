import express from "express";
const app = express();
import dotenv from "dotenv";
import { connectToDB } from "./database/config.js";
dotenv.config();
import authRouter from "./routes/auth.route.js"
import { clerkMiddleware } from '@clerk/express'

app.use(express.json());

const PORT = process.env.PORT || 4000 ;

await connectToDB();

app.use(clerkMiddleware)

app.use("/api/v1/auth",authRouter)

app.listen(PORT,()=>{
    console.log(`App is Listening to PORT ${PORT}`)
})