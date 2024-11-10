import express from "express";
import { isAdmin, isLoggedIn } from "../middlewares/isAuthenticated.js";
import { allSongs, featuredSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/song.controller.js";
const router = express.Router();


router.get("/songs",isLoggedIn,isAdmin,allSongs);
router.get("/featured-songs",featuredSongs)
router.get("/trending-songs",getTrendingSongs);
router.get("/made-for-you",getMadeForYouSongs)

export default router ;
