import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import validate from "../utils/validateEmail.js";
import createToken from "../utils/verifyToken.js";
import sendMail from "../utils/sendMail.js";
import {google} from "googleapis"
const {OAuth2} = google.auth

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

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const activate = async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    //verify token
    const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN);
    const { username, email, password } = user;
    //check user
    const check = await User.findOne({ email });
    if (check)
      return res.status(400).json({ msg: "This email is already registered!" });
    //add user
    const newUser = new User({
      email,
      password,
      username,
    });
    await newUser.save();
    res
      .status(200)
      .send("Your account has been activated, you can sign in now!");
  } catch (err) {
    next(err);
  }
};

export const access = async (req, res) => {
  try {
    // rf token
    const rf_token = req.cookies._apprftoken;
    if (!rf_token) return res.status(400).json({ msg: "Please sign in." });

    // validate
    jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please sign in again." });
      // create access token
      const ac_token = createToken.access({ id: user._id });
      // access success
      return res.status(200).json({ ac_token });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
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
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // update password
    await User.findOneAndUpdate({ id: req.user._id }, { password: hash });
    // reset success
    res.status(200).json({ msg: "Password was updated successfully." });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ msg: "Sign out success." });
  } catch (err) {
    next(err);
  }
};

export const googleSigning = async (req, res, next) => {
  try {
    // get Token Id
    const { tokenId } = req.body;

    // verify Token Id
    const client = new OAuth2(process.env.G_CLIENT_ID);
    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.G_CLIENT_ID,
    });

    // get data
    const { email_verified, email, username, picture } = verify.payload;

    // failed verification
    if (!email_verified)
      return res.status(400).json({ msg: "Email verification failed." });

    // passed verification
    const user = await User.findOne({ email });
    // 1. If user exist / sign in
    if (user) {
      // refresh token
      const rf_token = createToken.refresh({ id: user._id });
      // store cookie
      res.cookie("_apprftoken", rf_token, {
        httpOnly: true,
        path: "/api/auth/access",
        maxAge: 24 * 60 * 60 * 1000, // 24hrs
      });
      res.status(200).json({ msg: "Signing with Google success." });
    } else {
      // new user / create user
      const password = email + process.env.G_CLIENT_ID;
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hash,
        avatar: picture,
      });
      await newUser.save();
      // sign in the user
      // refresh token
      const rf_token = createToken.refresh({ id: user._id });
      // store cookie
      res.cookie("_apprftoken", rf_token, {
        httpOnly: true,
        path: "/api/auth/access",
        maxAge: 24 * 60 * 60 * 1000, // 24hrs
      });
      // success
      res.status(200).json({ msg: "Signing with Google success." });
    }
  } catch (err) {
    next(err);
  }
};
