import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middlewares/auth.middlware.js";

const router = express.Router();

// The paths here are relative to the /api/v1/message prefix from server.js
router.get("/get-messages/:receiverId", isAuthenticated, getMessages);
router.post("/send/:receiverId", isAuthenticated, sendMessage);

export default router;
