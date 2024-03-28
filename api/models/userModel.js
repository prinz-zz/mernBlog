import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);