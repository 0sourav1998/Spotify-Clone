import express from "express";
import { isLoggedIn } from "../middlewares/isAuthenticated.js";
import { getAllUser } from "../controllers/user.controller.js";
const router = express.Router();


router.get("/users",isLoggedIn,getAllUser);


export default router ;
