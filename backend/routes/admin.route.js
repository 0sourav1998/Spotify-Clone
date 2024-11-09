import express from "express";
const router = express.Router();
import { isLoggedIn, isAdmin } from "../middlewares/isAuthenticated.js";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controllers/admin.controller.js";

router.use(isLoggedIn, isAdmin);

router.get("/check-admin", checkAdmin);

router.post("/createSong", createSong);
router.delete("/song/:id", deleteSong);

router.post("/createAlbum", createAlbum);
router.delete("/album/:id", deleteAlbum);

export default router;
