import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      required: true,
    },
    categories: Array,
    content: String,
    photo: String,
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
  },

  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
