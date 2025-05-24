import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";



// Signup function
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if fullName, email and password are provided
    if(!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check if password length is valid
    if(password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if(newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      })
    }else {
      return res.status(400).json({ message: "Invalid user data" });
    }

    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


// Login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if(!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.find({ email });
    if(!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token and send response
    generateToken(existingUser._id, res);
    res.status(200).json({
      _id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      profilePic: existingUser.profilePic,
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


// Logout function
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0})
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


//Update user function
export const updateProfile = async (req, res) => {
  try{
    const { profilePic } = req.body;
    const userId = req.user._id;

    if(!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResposee = await cloudinary.uploader.upload(profilePic,);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResposee.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updateUser);

  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


// Check if user is authenticated
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Check auth error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}