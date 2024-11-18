import http, { createServer } from "http";
import { Server } from "socket.io";
import Message from "../models/message.model.js";
import express from "express";
const app = express();

export const initializeServer = (server) =>{
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",  // Update with the frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  
  const userSocketsMap = new Map();
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
      io.emit("updated_activity", { userId, activity });
    });
  
    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, message } = data;
        const newMessage = await Message.create({
          senderId,
          receiverId,
          message,
        });
        const receiverSocketId = userSocketsMap.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", newMessage);
          socket.emit("message_sent", newMessage);
        }
      } catch (error) {
        console.log(error);
      }
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

