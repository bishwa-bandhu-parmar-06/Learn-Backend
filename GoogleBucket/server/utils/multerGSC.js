const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: path.join(__dirname, process.env.GCLOUD_KEY_FILE),
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const uploadImageToGCS = (file) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(Date.now() + "-" + file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => reject(err));

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { upload, uploadImageToGCS };
