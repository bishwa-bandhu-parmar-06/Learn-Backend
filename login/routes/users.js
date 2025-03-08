const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/testinendgame2");

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);


// userSchema.methods.updateProfile = function(newemail, newUsername, newPassword, callback) {
//   this.username = newUsername;
//   this.email = newemail;

//   // If your user schema has a setPassword method for updating password, use it
//   if (newPassword) {
//     this.setPassword(newPassword, function(err) {
//       if (err) {
//         return callback(err);
//       }
//       this.save(callback);
//     });
//   } else {
//     this.save(callback);
//   }
// };




module.exports = mongoose.model("logindetails", userSchema);