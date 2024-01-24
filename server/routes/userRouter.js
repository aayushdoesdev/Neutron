import express from "express"
import { verifyToken } from "../middleware/auth.js"
import {getUser, getUserFriends, addRemoveFriends} from "../controllers/user.js"

const router = express.Router()

// READ
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)

// UPDATE
router.patch("/:id/:friendID", verifyToken, addRemoveFriends)


export {router as userRouter}