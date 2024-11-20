import http, { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
const app = express();


let userSocketsMap = new Map();

export const getReceiverSocketId = (receiverId) => {
  return userSocketsMap.get(receiverId);
};


export let io ;
export const initializeServer = (server) =>{
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  
  const userSocketActivity = new Map();

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      console.log(`User Connected With User Id ${userId}`)
      userSocketsMap.set(userId, socket.id);
      userSocketActivity.set(userId, "Idle");
      console.log("Initially",userSocketsMap,userSocketActivity)
      io.emit("user_connected", userId);
      socket.emit("users_online", Array.from(userSocketsMap.keys()));
      console.log(userSocketsMap.keys())
      io.emit("user_activities", Array.from(userSocketActivity.entries()));
      socket.userId = userId;
    });
  
    socket.on("update_activity", ({ userId, activity }) => {
      console.log(activity,userId)
      userSocketActivity.set(userId, activity);
      console.log(userSocketActivity)
      const activityArray = Array.from(userSocketActivity.entries());
      io.emit("updated_activity", activityArray);
      console.log("UPDATED ACTIVITY",activityArray)
    });
  
    socket.on("disconnect", () => {
      const userId = socket.userId;
      if (userId) {
        userSocketsMap.delete(userId);
        io.emit("user_disconnected", userId);
        io.emit("users_online", Array.from(userSocketsMap.keys()));
        io.emit("user_activities", Array.from(userSocketActivity.entries()));
      }
    });
  });
}

