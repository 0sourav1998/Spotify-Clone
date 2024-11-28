import express from "express";
const app = express();
import dotenv from "dotenv";
import { connectToDB } from "./database/config.js";
dotenv.config();
import authRouter from "./routes/auth.route.js";
import { clerkMiddleware } from '@clerk/express';
import { cloudinaryConfig } from "./cloudinary/config.js";
import fileUpload from "express-fileupload";
import adminRoute from "./routes/admin.route.js";
import albumRoute from "./routes/album.route.js";
import statRoute from "./routes/stats.route.js";
import songRoute from "./routes/song.route.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import playlistRoute from "./routes/playlist.model.js"

import cors from "cors";
import { initializeServer } from "./socket/socket.js";
import http from "http"

app.use(cors({
  origin: ["https://spotify-clone-2-ygpc.onrender.com" ],
  credentials: true,
}));

const httpServer = http.createServer(app);
initializeServer(httpServer)

app.use(express.json());
app.use(clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
}));

const PORT = process.env.PORT || 4000;

await connectToDB();
await cloudinaryConfig();

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
}));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/album", albumRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/song", songRoute);
app.use("/api/v1/stat", statRoute);
app.use("/api/v1/message",messageRoute);
app.use("/api/v1/playlist",playlistRoute)


httpServer.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
