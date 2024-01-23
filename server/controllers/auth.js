import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../models/User.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const {
      firstName,
      username,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const user = await users.findOne({ username });
    if (user) {
     return res.json("User already exist!");
    } 

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new users({
        firstName,
        username,
        email,
        password: hashedPassword,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });

      const savedUser = newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    
  } catch (err) {
    res.status(401).json("Some error occured");
  }
};


// LOGIN
export const login = async (req, res) =>{
  try {
    const {username, password} = req.body

    const user = await users.findOne({username})
    if(!user){
      return res.json({message: "User doesn't exist!"})
    }

    const isPasswordValid =  bcrypt.compare(password, user.password)
    if(!isPasswordValid){
      return res.json({message: "username or password is incorrect!"})
    }

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
    delete users.password

    res.status(200).json({user, token})
  } catch (err) {
    res.status(500).json("an error occured")
  }
}