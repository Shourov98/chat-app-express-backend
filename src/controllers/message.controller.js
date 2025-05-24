import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


// Function to get users for the sidebar
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
      .select("-password -__v")
      .sort({ createdAt: -1 });
    res.status(200).json({ users: filteredUsers });
    
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
    console.error("Error fetching users for sidebar:", error);
  }
}


// Function to get messages between two users
export const getMessages = async (req, res) => {
  try {
    const {id:userToChatId} = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId:myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    })
    .sort({ createdAt: 1 })


    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Internal server error" });
    
  }
}


// Function to send a message to another user I want to chat with
export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({ message: "Message can't be empty" });
    }

    const senderId = req.user._id;


    let imageUrl = null;
    // If an image is provided, handle the image upload logic here
    if(image) {
      const uploadResposee = await cloudinary.uploader.upload(image);
      const imageUrl = uploadResposee.secure_url;
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl || null,
    });

    // Save the message to the database
    await newMessage.save();

    // Optionally, you can also update the last message in the chat between these two users
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Respond with the newly created message
    res.status(201).json({ message: "Message sent successfully", data: newMessage });


  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};