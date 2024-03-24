import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorMsg } from '../utils/errorMsg.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorMsg(400, "All fields are required"));
  }

const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json('Signup successful');
  } catch (error) {
    next(error);
  }
};
