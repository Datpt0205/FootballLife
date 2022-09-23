import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import pitchCentersRoute from "./routes/pitchCenters.js"
import pitchesRoute from "./routes/pitches.js"
import cookieParser from 'cookie-parser'

const app = express();
dotenv.config();

const connect = () => {
  try {
    mongoose.connect(process.env.uri);
  } catch (error) {
    throw error;
  }
};

//middleware
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/pitchCenters", pitchCentersRoute)
app.use("/api/pitches", pitchesRoute)

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message ||"Something went wrong";

  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(8000, () => {
  connect();
  console.log("Connected to backend!");
});
