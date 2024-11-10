import Album from "../models/album.model.js";

export const getAllAlbum = async (req, res) => {
  try {
    const allAlbum = await Album.find({});
    return res.status(200).json({
      success: true,
      message: "Albums Fetched Successfully",
      allAlbum,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Albums",
    });
  }
};

export const getSingleAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "This Filed is Required",
      });
    }
    const album = await Album.findById(id).populate(songs);
    return res.status(200).json({
      success: true,
      message: "Album Fetched Successfully",
      album,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Album",
    });
  }
};
