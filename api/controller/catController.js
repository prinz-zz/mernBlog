import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";

const newCategory = asyncHandler(async (req, res) => {
    const newCat =  new Category(req.body)
    const savedCat = await newCat.save()
    res.status(200).json(savedCat)
});

const getCategories = asyncHandler(async (req, res) => {
    const cats =  await Category.find()
    res.status(200).json(cats)
    if(!cats){
        res.status(404)
        throw new Error("Cannot find categories")
    }
});

export { newCategory, getCategories };
