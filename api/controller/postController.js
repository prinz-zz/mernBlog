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

  console.log("postID: ", post.id);
  console.log("Body id: ", req.body._id);

  if (post.id === req.body._id) {
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
  const post = await Post.findById(req.params.id);
  const { id } = req.params;

  console.log("postID: ", post.id);
  console.log("Body id: ", req.body._id);

  if (post.id === req.body._id) {
    await post.deleteOne();
    res.status(200).json("Post deleted successfully");
  } else {
    res.status(401);
    throw new Error("You can delete only your post");
  }
});

////////////////////////////FIND SINGLE POST//////////////////////////////////

const findPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Sorry, no post found");
  } else {
    res.status(200).json(post);
  }
});

////////////////////////////FIND ALL POSTS//////////////////////////////////

const findAllPosts = asyncHandler(async (req, res) => {
  const username = req.query.user;
  const category = req.query.cat;

  let posts;

  if (username) {
    posts = await Post.find({ username });
  } else if (category) {
    posts = await Post.find({
      categories: {
        $in: [category],
      },
    });
  } else {
    posts = await Post.find();
  }
  res.status(200).json(posts);

  if (!posts) {
    res.status(404);
    throw new Error("Sorry, no posts found");
  }
});

export { createPost, updatePost, deletePost, findAllPosts, findPost };
