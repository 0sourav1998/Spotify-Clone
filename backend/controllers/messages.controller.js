import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {

    try {
      const { receiverId, message } = req.body;
      const senderId = req.auth.userId ;

      console.log(senderId,receiverId,message);
  
      if (!senderId || !receiverId || !message) {
        return res.status(400).json({
          success: false,
          message: "All Fields Are Required",
        });
      }

      const sender = await User.findOne({clerkId : senderId});
      const receiver = await User.findOne({clerkId : receiverId})
  
      // Find existing conversation
      let gotConversation = await Conversation.findOne({
        participants: { $all: [sender._id, receiver._id] },
      });
  
      // If no conversation exists, create a new one
      if (!gotConversation) {
        gotConversation = await Conversation.create({
          participants: [sender._id, receiver._id],
          messages: [],
        });
      }
  

      const newMessage = await Message.create({
        senderId : sender._id,
        receiverId : receiver._id,
        message,
      });

      const populatedMessage = await Message.findById(newMessage._id)
      .populate("senderId")
      .populate("receiverId");

      gotConversation.messages.push(newMessage._id);
      await gotConversation.save();
  
      const receiverSocketId = await getReceiverSocketId(receiverId);
      console.log(receiverSocketId)
      if (receiverSocketId) {
        console.log("Socket Working",receiverSocketId)
        io.to(receiverSocketId).emit("send_message", populatedMessage);
      }
  
      return res.status(200).json({
        success: true,
        message: "Message Sent Successfully",
        populatedMessage
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  };
  

export const getAllMessage = async (req, res) => {
  try {
    console.log("here")
    const senderId = req.auth.userId;
    const { id } = req.params;
    const sender = await User.findOne({clerkId : senderId});
    const receiver = await User.findOne({clerkId : id});

    const conversation = await Conversation.findOne({
      participants: { $all: [sender._id, receiver._id] },
    }).populate({path : "messages" , populate : [
      {path : "senderId"},
      {path : "receiverId"}
    ]});
    if (!conversation) {
        return res.status(200).json({
          success: true,
          message: "No messages found for this conversation",
          messages: [],
        });
      }

    console.log(conversation.messages);
    return res.status(200).json({
      success: true,
      message: "Messages Fetched Successfully",
      messages: conversation.messages  
    });
  } catch (error) {
    console.log(error.message);
  }
};
