import mongoose from "mongoose";
const { Schema } = mongoose;


const PostSchema = new Schema({
    userId: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        max: 500,
      },
      img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
}, { timestamps: true });

export default mongoose.model("Post", PostSchema);