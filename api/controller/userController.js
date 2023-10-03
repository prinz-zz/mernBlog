import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcrypt";

//GET PROFILE

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//UPDATE PROFILE

const updateUserProfile = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          $new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401);
    throw new Error("You can only update your account");
  }
});

////////////////DELETE PROFILE////////////////

const deleteUserProfile = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id) {
    
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({author : user.author});
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json('User not found');
    }
    
  } else {
    res.status(401);
    throw new Error("You can only delete your account");
  }
});

export { getUserProfile, updateUserProfile, deleteUserProfile };
