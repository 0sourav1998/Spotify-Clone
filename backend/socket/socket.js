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
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  
  const userSocketActivity = new Map();

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSocketsMap.set(userId, socket.id);
      userSocketActivity.set(userId, "Idle");
      io.emit("user_connected", userId);
      socket.emit("users_online", Array.from(userSocketsMap.keys()));
      io.emit("user_activities", Array.from(userSocketActivity.entries()));
      socket.userId = userId;
    });
  
    socket.on("update_activity", ({ userId, activity }) => {
      userSocketActivity.set(userId, activity);
      const activityArray = Array.from(userSocketActivity.entries());
      io.emit("updated_activity", activityArray);
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

