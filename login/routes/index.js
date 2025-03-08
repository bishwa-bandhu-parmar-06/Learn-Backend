var express = require('express');
//var express: Yeh line express module ko import kar rahi hai, jo web applications banane mein use hota hai.

var router = express.Router();
//var router: Yeh line ek naya router instance banata hai, jise hum later routes ke liye use karenge.

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const userModel = require("./users");
// const userModel: Yeh line users.js file se userModel variable ko import kar rahi hai, jisme user schema aur authentication logic hoti hai.

const passport = require("passport");
//const passport: Yeh line passport module ko import kar rahi hai, jo user authentication ko handle karta hai.


const LocalStrategy = require("passport-local");
//const LocalStrategy: Yeh line passport-local module se LocalStrategy ko import kar rahi hai, jo local username aur password authentication strategy provide karta hai.


passport.use(new LocalStrategy(userModel.authenticate()));
//Yeh line local authentication strategy ko setup kar rahi hai, jisme userModel mein define kiya gaya authenticate function use hota hai.

router.get("/",function(req, res){
  res.render("index");
});
//Yeh ek GET request handler hai jo "/" endpoint par request ko handle karta hai aur "index" view ko render karta hai.


router.get("/profile", isLoggedIn, function(req, res){
  res.render("profile", { user: req.user });
});

// router.get("/Updateprofile", isLoggedIn, function(req, res){
//   res.render("Updateprofile");
// });


// router.post("/Updateprofile", isLoggedIn, function(req, res) {
//   const { newemail, newUsername, newPassword } = req.body;

//   // Use the updateProfile method from the user model
//   req.user.updateProfile(newemail, newUsername, newPassword, function(err) {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Internal Server Error");
//     }

//     res.redirect("/profile");
//   });
// });



router.get("/register", function(req, res){
  res.render("registration");
});
router.get("/login", function(req, res){
  res.render("login");
});
router.get("/logout", function(req, res){
  res.render("index");
});

//Yeh ek GET request handler hai jo "/profile" endpoint par request ko handle karta hai.
//isLoggedIn: Yeh ek middleware function hai jo check karta hai ki user authenticated hai ya nahi.
//Agar user authenticated hai toh "profile" view ko render karta hai, nahi toh "/" par redirect karta hai.

router.post("/register",function(req, res){
  var userdata = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    secret: req.body.secret
  });
  userModel.register(userdata, req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile");
    });
  });
});
//Yeh ek POST request handler hai jo "/register" endpoint par request ko handle karta hai.
// User ki details ko userModel mein register karta hai aur phir authentication ke baad "/profile" par redirect karta hai.

router.get("/error", function(req, res){
  res.render("error");
});


router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/error"
}), function(req, res){});
//Yeh ek POST request handler hai jo "/login" endpoint par request ko handle karta hai.
//passport.authenticate("local", {...}): Yeh line local strategy ka istemal karke user authentication ko handle karti hai.
//Agar authentication sahi hai toh "/profile" par redirect karta hai, nahi toh "/" par.


router.post('/logout',isLoggedOut, function(req, res){
  req.logout(function(err){
    if(err) return next(err);
    res.redirect("/");
  });
  res.redirect("/");
});
//Yeh ek GET request handler hai jo "/logout" endpoint par request ko handle karta hai.
//User ko logout karta hai aur phir "/" par redirect karta hai.

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
};
//Yeh ek middleware function hai jo check karta hai ki user authenticated hai ya nahi.
//Agar authenticated hai toh agla middleware ya route handler ko call karta hai, nahi toh "/" par redirect karta hai.

function isLoggedOut(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}
//Yeh ek aur middleware function hai jo check karta hai ki user logged out hai ya nahi.
//Agar user logged out hai toh next() ko call karta hai, nahi toh "/" URL par redirect karta hai.


module.exports = router;
//Yeh line router ko export kar rahi hai, taki iska istemal kisi aur file mein kiya ja sake.