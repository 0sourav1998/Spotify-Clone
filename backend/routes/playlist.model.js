import express from "express";
const app = express();
const router = express.Router();
import { isLoggedIn } from "../middlewares/isAuthenticated.js";
import { addOrRemoveSong, createPlaylist, deletePlaylist, fetchSinglePlaylist, getAllPlaylist } from "../controllers/playlist.controller.js";

app.use(isLoggedIn);

router.get("/all",getAllPlaylist)
router.post("/single", fetchSinglePlaylist);
router.post("/createPlaylist", createPlaylist);
router.delete("/delete", deletePlaylist);
router.post("/addOrRemove",isLoggedIn,addOrRemoveSong);

export default router;
