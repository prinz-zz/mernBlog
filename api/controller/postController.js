import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Post.js";

//CREATE POST

const createPost = asyncHandler(async (req, res) => {
  const newPost = new Post(req.body);
  const savedPost = await newPost.save();
  res.status(200).json(savedPost);
});

//UPDATE POST

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const { id } = req.params;

  console.log(id);
  console.log(post);

  if (post.id === req.body.id) {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } else {
    res.status(401);
    throw new Error("You can update only your post");
  }
});

////////////////DELETE POST////////////////

const deletePost = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ author: user.author });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401);
    throw new Error("You can only delete your account");
  }
});

export { createPost, updatePost, deletePost };
