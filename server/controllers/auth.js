import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import validate from "../utils/validateEmail.js";
import createToken from "../utils/verifyToken.js";
import sendMail from "../utils/sendMail.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    //check fields
    if (!username || !email || !password)
      return res.status(400).json({ msg: "Please fill in all fields." });
    //check emails
    if (!validate(email))
      return res
        .status(400)
        .json({ msg: "Please enter a valid email address" });
    //check user
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ msg: "This email is already registered!" });
    //check password
    if (password.length < 6)
      return res.status(400).json({ msg: "Password must be longer!" });
    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    //create Token
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const activation_token = createToken.activation(newUser);

    //send mail
    const url = `http://localhost:3000/api/auth/activate/${activation_token}`;
    sendMail.sendEmailRegister(email, url, "Verify your email!");
    res.status(200).send("Welcome, please check your email!");
  } catch (err) {
    next(err);
  }
};

export const activate = async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    //verify token
    const user = jwt.verify(activation_token, process.env.JWT);
    const { username, email, password, phone, city, country } = user;
    //check user
    const check = await User.findOne({ email });
    if (check)
      return res.status(400).json({ msg: "This email is already registered!" });
    //add user
    const newUser = new User({
      email,
      password,
      username,
      phone,
      country,
      city,
    });
    await newUser.save();
    res
      .status(200)
      .send("Your account has been activated, you can sign in now!");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "This email is not registered!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Password incorrect!"));

    //refresh token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    //access_token
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, //24h
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    //get email
    const { email } = req.body;
    //check email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(200).json({ msg: "This email does not exist!" });
    //create access token
    const access_token = createToken.access({ id: user._id });
    //send mail
    const url = `http://localhost:3000/auth/reset-password/${access_token}`;
    const username = user.username;
    sendMail.sendEmailReset(email, url, "Reset your password", username);
    res
      .status(200)
      .json({ msg: "Re-send your password, please check your password!" });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // update password
    await User.findOneAndUpdate(
      {id: req.user._id},
      {password: hash},
    );
    // reset success
    res.status(200).json({ msg: "Password was updated successfully." });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    localStorage.removeItem("user");
  } catch (err) {
    next(err);
  }
};
