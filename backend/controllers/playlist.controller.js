import uploadFileToCloudinary from "../lib/uploadFileToCloudinary.js";
import Playlist from "../models/playlist.model.js";
import User from "../models/user.model.js";

export const createPlaylist = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { title } = req.body;
    const { imageUrl } = req.files;
    if (!userId || !title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const user = await User.findOne({clerkId:userId});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    

    const cloudinaryResponse = await uploadFileToCloudinary(
      imageUrl,
      process.env.CLOUDINARY_FOLDER
    );

    const newPlaylist = await Playlist.create({
      owner: user._id,
      title: title,
      imageUrl: cloudinaryResponse.secure_url,
    });

    await User.findByIdAndUpdate(user.__id, {
      $push: { playlists: newPlaylist._id },
    });
    
    return res.status(201).json({
      success: true,
      message: "Playlist Created Successfully",
      newPlaylist,
    });
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Creating Playlist",
    });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const userId = req.auth.userId;
    if (!playlistId || !userId) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);
    await User.findByIdAndUpdate(userId, { $pull: { playlists: playlistId } });
    return res.status(200).json({
      success: true,
      message: "Playlist Deleted Successfully",
      deletedPlaylist,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Deleting Playlist",
    });
  }
};

export const getAllPlaylist = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const allPlaylists = await Playlist.find({ owner: userId });
    return res.status(200).json({
      success: true,
      message: "Playlist Deleted Successfully",
      allPlaylists,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Playlists",
    });
  }
};

export const fetchSinglePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.body;
    if (!playlistId) {
      return res.status(400).json({
        success: false,
        message: "This Field is Required",
      });
    }
    const singlePlaylist = await Playlist.findById(playlistId).populate(
      "songs"
    );
    if (!singlePlaylist) {
      return res.status(404).json({
        success: false,
        message: "Playlist Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Playlist Fetched Successfully",
      singlePlaylist,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Playlist",
    });
  }
};
