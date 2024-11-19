import express from "express";
import { isLoggedIn } from "../middlewares/isAuthenticated.js";
import { getAllMessage, sendMessage } from "../controllers/messages.controller.js";
const router = express.Router();


router.get("/allMessages/:id",isLoggedIn,getAllMessage);
router.post("/send",isLoggedIn,sendMessage)


export default router ;
