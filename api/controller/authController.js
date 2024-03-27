import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { errorMsg } from "../utils/errorMsg.js";
import jwt from "jsonwebtoken";

////////signup
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
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

//////signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorMsg(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorMsg(404, "User not found"));
    }
    console.log(validUser);

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorMsg(404, "Wrong credentials"));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "20m" }
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    console.log(error);
  }
};

/// google.auth
export const google = async (req, res, next) => {
  const { name, email, photo } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "20m",
      });
      const { password: pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(generatedPassword, salt)
      const newUser = new User({
        username: name,
        email,
        password: hashedPassword,
        photo,
      })
    }
  } catch (error) {
    next(error);
  }
};
