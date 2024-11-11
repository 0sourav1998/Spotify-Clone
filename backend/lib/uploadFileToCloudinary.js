import { v2 as cloudinary } from "cloudinary";

const uploadFileToCloudinary = async (
  file,
  folder,
  quality,
  height
) => {
  try {
    const options = {};
    options.resource_type = "auto";
    options.folder = folder ;

    if (quality) {
      options.quality = quality;
    }
    if (height) {
      options.height = height;
    }
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    console.error(error.message);
  }
};
export default uploadFileToCloudinary ;
