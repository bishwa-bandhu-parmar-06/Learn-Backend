const { uploadImageToGCS } = require("../utils/multerGSC");
const Image = require("../models/imageModel");

const handleImageUpload = async (req, res) => {
  try {
    const imageUrl = await uploadImageToGCS(req.file);
    
    // Save to DB
    const newImage = new Image({ imageUrl });
    await newImage.save();

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

module.exports = { handleImageUpload };
