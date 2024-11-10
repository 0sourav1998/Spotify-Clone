import express from "express";
import { isAdmin, isLoggedIn } from "../middlewares/isAuthenticated.js";
import { statController } from "../controllers/stat.controller.js";
const router = express.Router();


router.get("/stats",isLoggedIn,isAdmin,statController);


export default router ;
