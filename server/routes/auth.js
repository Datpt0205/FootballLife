import express from "express";
import { register, login, logout, activate, forgotPassword, resetPassword, googleSigning, access } from "../controllers/auth.js";
import {auth} from "../utils/auth.js"

const router = express.Router();

router.post("/register", register);

router.post("/activate", activate);

router.post("/login", login);

router.post("/forgot_password", forgotPassword);

router.post("/reset_password", auth, resetPassword);

router.get("/logout", logout);

router.post("/google_singing", googleSigning)

router.post("/access", access);

export default router;
