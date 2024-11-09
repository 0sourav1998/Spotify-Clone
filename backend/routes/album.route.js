import express from "express";
import { getAllAlbum, getSingleAlbum } from "../controllers/album.controller.js";
const router = express.Router();


router.get("/all",getAllAlbum);
router.get("/album/:id",getSingleAlbum)

export default router ;
