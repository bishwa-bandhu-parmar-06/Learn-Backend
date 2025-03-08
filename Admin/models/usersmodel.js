const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/healthcareDB");
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
  usersname: String,
  name: String,
  email: String,
  password: String,
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Patient", userSchema);