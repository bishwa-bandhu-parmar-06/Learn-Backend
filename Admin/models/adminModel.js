const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/healthcareDB");
const passportLocalMongoose = require('passport-local-mongoose');


const adminSchema = new mongoose.Schema({
  usersname: String,
  name: String,
  email: String,
  password: String,
});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", adminSchema);