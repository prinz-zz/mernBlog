import express from "express";
const router = express.Router();
import { newCategory, getCategories } from "../controller/catController.js";

router.post('/', newCategory)
router.get('/', getCategories)

export default router;
