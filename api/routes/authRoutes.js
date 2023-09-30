import express from "express";
const router = express.Router();
import { register, login, logoutUser } from "../controller/authController.js";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);

export default router;
