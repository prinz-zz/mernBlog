import express from "express";
const router = express.Router();
import {
  createPost,
  updatePost,
  deletePost,
  findAllPosts,
  findPost,
} from "../controller/postController.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

router.post("/", protectedRoutes, createPost);
router.put("/:id", protectedRoutes, updatePost);
router.delete("/:id", protectedRoutes, deletePost);
router.get("/", findAllPosts);
router.get("/:id", findPost);

export default router;
