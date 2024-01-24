import express, { Router } from "express"
import { verifyToken } from "../middleware/auth.js"
import {getFeedPost, getUserPost, likePost} from "../controllers/post.js"

const router = Router()

// GET POST
router.get("/", verifyToken, getFeedPost)
router.get("/:userID/posts", verifyToken, getUserPost)

// UPDATE
router.patch("/:id/like", verifyToken, likePost)

export {router as postRouter}