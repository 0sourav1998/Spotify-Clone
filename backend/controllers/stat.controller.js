import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import User from "../models/user.model.js";

export const statController = async (req, res) => {
  try {
    const [songCount, albumCount, userCount, uniqueArtistCount] = await Promise.all([
      Song.countDocuments(),
      Album.countDocuments(),
      User.countDocuments(),
      Song.aggregate([
        {
          $unionWith: {
            coll: "albums",
            pipeline: []
          }
        },
        {
          $group: {
            _id: "$artist"
          }
        },
        {
          $count: "count"
        }
      ])
    ]);

    const artistCount = uniqueArtistCount[0]?.count || 0;

    return res.status(200).json({
      success: true,
      message: "Statistics fetched successfully",
      songCount,
      albumCount,
      userCount,
      uniqueArtistCount: artistCount
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
      error: error.message || "Internal Server Error"
    });
  }
};
