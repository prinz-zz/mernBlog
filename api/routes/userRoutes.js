import express from "express";
const router = express.Router();
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controller/userController.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";

router.get("/profile/:id", protectedRoutes, getUserProfile);
router.put("/profile/:id", protectedRoutes, updateUserProfile);
router.delete("/profile/:id", protectedRoutes, deleteUserProfile);

export default router;
