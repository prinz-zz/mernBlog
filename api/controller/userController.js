import bcrypt from "bcryptjs";
import { errorMsg } from "../utils/errorMsg.js";
import User from "../models/userModel.js";


/////////////////UPDATE/////////
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorMsg(403, "You are not authorised to update the user"));
  }
  
  if (req.body.password) {
    if (req.body.password.lenght < 6) {
      return next(errorMsg(400, "Password must be at least 6 characters"));
    }
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.lenght > 20) {
      return next(
        errorMsg(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorMsg(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorMsg(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorMsg(400, "Username must contain only alphabets and numbers")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
            username: req.body.username,
            email: req.body.email,
            photo: req.body.photo,
            password: req.body.password,
        }
      },
      { new: true }
    );

    const {password, ...rest} = updatedUser._doc;
    res.json(rest);

  } catch (error) {
    next(error);
  }
};


/////////////////////////DELETE//////////////////////////////
export const deleteUser = async (req, res, next) =>{

  if(req.user.id !== req.params.userId){
    return next(errorMsg(401, 'You are not authorised to update the user'))
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({
      message:"User has been deleted",
      user: deletedUser
    })
  } catch (error) {
    next(error)
  }

}