import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import uploadFileToCloudinary from "../lib/uploadFileToCloudinary.js";

export const checkAdmin = async (req, res) => {
  return res.status(200).json({
    admin: true,
  });
};

export const createSong = async (req, res) => {
  try {
    if (!req?.files || !req?.files?.audioFile || !req?.files?.imageFile) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    const songFromCloudinary = await uploadFileToCloudinary(
      req.files.audioFile,
      process.env.CLOUDINARY_FOLDER
    );
    const imageFromCloudinary = await uploadFileToCloudinary(
      req.files.imageFile,
      process.env.CLOUDINARY_FOLDER
    );
    const { title, artist, duration, albumId } = req.body;
    const newSong = await Song.create({
      title,
      artist,
      audioUrl: songFromCloudinary.secure_url,
      imageUrl: imageFromCloudinary.secure_url,
      duration,
      albumId: albumId ? albumId : null,
    });
    let newAlbum;
    if (albumId) {
      newAlbum = await Album.findByIdAndUpdate(albumId, {
        $push: { songs: newSong._id },
      });
    }
    return res.status(201).json({
      success: true,
      message: "Song Created",
      newSong,
      newAlbum,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error !!!",
    });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "This Filed is Required",
      });
    }
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song Not Found",
      });
    }
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    const deletedSong = await Song.findByIdAndDelete(song._id);
    return res.status(200).json({
      success: true,
      message: "Song Deleted Successfully",
      deletedSong,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      success: true,
      message: "Something Went Wrong While Deleting Song",
    });
  }
};

export const createAlbum = async (req,res) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const image = req.files.imageUrl;
    console.log(title,artist,releaseYear,image)
    if (!title || !artist || !releaseYear || !image) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    const imageFromCloudinary = await uploadFileToCloudinary(
      image,
      process.env.CLOUDINARY_FOLDER
    );
    console.log(imageFromCloudinary)
    if (!imageFromCloudinary) {
      return res.status(400).json({
        success: false,
      });
    }
    const newAlbum = await Album.create({
      title,
      artist,
      releaseYear,
      imageUrl: imageFromCloudinary.secure_url,
    });
    return res.status(201).json({
      success: true,
      message: "Album Created Successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      success: true,
      message: "Something Went Wrong While Creating Album",
    });
  }
};

export const deleteAlbum = async () => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "This Filed is Required",
      });
    }
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album Not Found",
      });
    }
    await Song.deleteMany({ albumId: id });
    const deletedAlbum = await Album.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Album Deleted",
      deletedAlbum,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      success: true,
      message: "Something Went Wrong While Deleting Album",
    });
  }
};
