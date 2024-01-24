import mongoose from "mongoose";
import { users } from "../models/User.js";

// GET
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

// GET ALL FRIENDS
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => users.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, username, occupation, location, picturePath }) => {
        return { _id, firstName, username, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends)
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

// ADD/REMOVE FRIENDS
export const addRemoveFriends = async(req, res) =>{
  try {
    const {id, friendID} = req.params
    const user = await users.findById(id)
    const friend = await users.findById(friendID)

    if(user.friends.includes(friendID)){
      user.friends = user.friends.filter((id) => id !== friendID)
      friend.friends = friend.friends.filter((id) => id !== id)
    }else{
      user.friends.push(friendID)
      friend.friends.push(id)
    }
    await user.save()
    await friend.save()

    const friends = await Promise.all(
      user.friends.map((id) => users.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, username, occupation, location, picturePath }) => {
        return { _id, firstName, username, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends)

  } catch (err) {
    res.status(404).json({error: err})
  }
}

