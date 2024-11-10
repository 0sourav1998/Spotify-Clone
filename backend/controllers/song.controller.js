import Song from "../models/song.model.js";

export const allSongs = async (req, res) => {
  try {
    const songs = await Song.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Songs Fetched Successfully",
      songs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Songs",
    });
  }
};

export const featuredSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: 6,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          imageUrl: 1,
          audioUrl: 1,
          artist: 1,
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Songs Fetched successfully",
      songs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Songs",
    });
  }
};

export const getMadeForYouSongs = async () => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: 4,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          imageUrl: 1,
          audioUrl: 1,
          artist: 1,
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Songs Fetched successfully",
      songs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Songs",
    });
  }
};
export const getTrendingSongs = async () => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: 6,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          imageUrl: 1,
          audioUrl: 1,
          artist: 1,
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Songs Fetched successfully",
      songs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Songs",
    });
  }
};
