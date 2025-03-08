const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost:27017/healthcareDB");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePic: String,
  bio: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Patient", userSchema);