import express from "express";
import { isLoggedIn } from "../middlewares/isAuthenticated.js";
import { fetchUserId, getAllUser } from "../controllers/user.controller.js";
const router = express.Router();


router.get("/users",isLoggedIn,getAllUser);
router.get("/user/:id",isLoggedIn,fetchUserId)


export default router ;
