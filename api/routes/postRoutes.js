import express from "express";
const router = express.Router();
import {
  createPost,
  updatePost,
  deletePost,
} from "../controller/postController.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

router.post("/", protectedRoutes, createPost);
router.put("/update/:id", protectedRoutes, updatePost);
router.delete("/post/:id", protectedRoutes, deletePost);

export default router;
