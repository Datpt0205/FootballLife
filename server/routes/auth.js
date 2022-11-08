import express from "express";
import { register, login, logout, activate } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/activate", activate);

router.post("/login", login);

router.post("/logout", logout);

export default router;
