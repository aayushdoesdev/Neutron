import { posts } from "../models/Post.js";
import { users } from "../models/User.js";

// CREATE NEW POST
export const createPost = async (req, res) => {
  try {
    const { userID, description, picturePath } = req.body;
    const user = users.findById(userID);
    const newPost = new posts({
      userID,
      firstName: user.firstName,
      username: user.username,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await posts.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(409).json({ message: err });
  }
};

// GET ALL POST
export const getFeedPost = async (req, res) => {
  try {
    const post = await posts.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

// GET USER POST
export const getUserPost = async (req, res) => {
  try {
    const { userID } = req.params;
    const post = await posts.find({ userID });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const likePost = async(req, res) =>{
    try {
        const { id } = req.params
        const {userID} = req.body
        const post = await posts.findById(id)
        const isLiked = post.likes.get(userID)

        if(isLiked){
            post.likes.delete(userID)
        }else{
            post.likes.set(userID, true)
        }

        const updatedPost = await posts.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )
        res.status(200).json(updatedPost); 
    } catch (err) {
        res.status(404).json({ message: err });
    }
}