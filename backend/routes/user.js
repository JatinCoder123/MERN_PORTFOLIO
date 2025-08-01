import express from "express";
import {forgotPassword, getUser, getUserForPortfolio, login, logout, register, resetPassword, updatePassword, updateProfile  } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout);
router.get("/me",isAuthenticated,getUser);
router.put("/update/me",isAuthenticated,updateProfile);
router.put("/update/password",isAuthenticated,updatePassword);
router.get("/me/portfolio",getUserForPortfolio);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token",resetPassword);

export default router;
