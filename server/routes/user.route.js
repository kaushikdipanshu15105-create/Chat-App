import express from "express";
import { getOtherUsers, getProfile, login, logout, register } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middlware.js";

const router = express.Router();

// The paths here are relative to the /api/v1/user prefix from server.js
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/get-profile", isAuthenticated, getProfile);
router.get("/get-other-users", isAuthenticated, getOtherUsers);

export default router;