import express from "express";
import { authFunction } from "../controllers/auth.controller";
const router = express.Router();


router.post("/auth",authFunction)

export default router ;
