import mongoose from "mongoose";

// creating a user schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true,
    },
    email:{
        type: String,
        required:true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default:0,
    }
},{timestamps:true})

// exporting mongoose model

export default mongoose.model('users',userSchema);