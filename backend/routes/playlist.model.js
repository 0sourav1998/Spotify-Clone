import express from "express";
const app = express();
const router = express.Router();
import { isLoggedIn } from "../middlewares/isAuthenticated.js";
import { createPlaylist, deletePlaylist, fetchSinglePlaylist, getAllPlaylist } from "../controllers/playlist.controller.js";

app.use(isLoggedIn);

router.get("/all",getAllPlaylist)
router.get("/playlist/get/:id", fetchSinglePlaylist);
router.post("/createPlaylist", createPlaylist);
router.delete("/playlist/:id", deletePlaylist);

export default router;
