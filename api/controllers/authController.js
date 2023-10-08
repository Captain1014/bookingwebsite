import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {createError} from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);   

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send("User was registered successfully!");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
    try{
        const user = await User.findOne({username: req.body.username}) // we need await because it's an async function
        if(!user) return next(createError(400, 'User not found'));

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return next(createError(400, 'Invalid password'));

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
        const {password, isAdmin, ...others} = user._doc; // we don't want to send the password and isAdmin to the client
    
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...others});
    } catch (err) {
        next(err);
    }


    };