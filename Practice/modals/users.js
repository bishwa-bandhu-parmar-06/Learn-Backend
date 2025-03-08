const mongoose = require('mongoose');
//const passportLocalMongoose = require('passport-local-mongoose');
require('./db/connection');

//mongoose.connect("mongodb://localhost:27017/");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePic: String,
  bio: String,
});

//userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("details", userSchema);