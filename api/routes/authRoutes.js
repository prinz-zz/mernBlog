import express from "express";
const router = express.Router();
import { signup, signin, google } from "../controller/authController.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

export default router;
