import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import { register } from "./controllers/auth.js"
import {authRouter} from "./routes/authRoutes.js"
import {userRouter} from "./routes/userRouter.js"
import { postRouter } from "./routes/postRouter.js"
import { createPost } from "./controllers/post.js"

// MIDDLEWARE CONFIG
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))



// FILE STORAGE
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })


// THIS ROUTE IS MADE HERE BECAUSE WE HAVE USED UPLOAD FUNCTION 
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", upload.single("picture"), createPost)

// ROUTES
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("posts", postRouter)



// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI).then(() =>{
   console.log(`Database connected successfully`)
}).catch((error) =>{
   console.error(error)
})

app.listen(process.env.PORT, () =>{
    console.log(`Server started on port ${process.env.PORT}`)
})
