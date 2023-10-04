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
    username: String,
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
