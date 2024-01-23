import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        min:4,
        max:20
    },
    username:{
        type: String,
        required: true,
        min:4,
        max:15,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        max:20
    },
    password:{
        type: String,
        required: true,
        min:4,
    },
    picturePath:{
        type: String,
        default: ""
    },
    friends:{
        type: Array,
        default: []
    },
    location: String,
    occupation: String,
    impressions: Number,
    viewedProfile: Number
}, {timestamps: true})

export const users = mongoose.model("users", userSchema)