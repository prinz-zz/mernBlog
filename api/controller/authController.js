import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

////////////REGISTER/////////////////////////////////////////////
const register = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;

  //Fields empty
  const isEmpty = Object.values(req.body).some((value) => value === "");
  if (isEmpty) {
    res.status(400);
    throw new Error("All fields are required");
  }

  //User exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //password hash
  const hashedPassword = await bcrypt.hash(password, 10); //10 : salt rounds

  const user = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  if (user) {
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});




/////////////LOGIN/////////////////////////////////////////////
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //isEmpty
  const isEmpty = Object.values(req.body).some((value) => value === "");

  if (isEmpty) {
    res.status(400);
    throw new Error("All fields are required");
  }

  //find User
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
    return;
  }

  //Match username and password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!user || !isMatch) {
    res.status(400);
    throw new Error("Invalid username or password");
  }

  if (user) {
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  }
});




///////////////LOGOUT/////////////////////////////////////////////
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json("Loggeddddddddddd out successfully");
});

export { register, login, logoutUser };
