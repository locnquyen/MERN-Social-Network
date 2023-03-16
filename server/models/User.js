import mongoose from "mongoose";
const { Schema } = mongoose;


const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        min: 1,
        max: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

export default mongoose.model("User", UserSchema);