const express = require("express");
const router = express.Router();
const { upload } = require("../utils/multerGSC");
const { handleImageUpload } = require("../controllers/uploadController");

router.post("/upload", upload.single("image"), handleImageUpload);

module.exports = router;
