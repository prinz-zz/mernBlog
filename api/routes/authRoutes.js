import express from "express";
const router = express.Router();
import { signup } from "../controller/authController.js";
import { signin } from "../controller/authController.js";

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
