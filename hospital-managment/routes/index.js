var express = require('express');
var router = express.Router();


const userModel = require("../modals/users");
const hospitalModel = require("./hospitaData");

const passport = require("passport");
const LocalStrategy = require("passport-local");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/error', function(req, res, next) {
  res.render('error');
});
router.get('/register-user', function(req, res, next) {
  res.render('userSignup');
});
router.get('/login-user', function(req, res, next) {
  res.render('userLogin');
});

router.get('/patient-profile', isLoggedIn , function(req, res, next) {
  res.render('userProfile');
});



router.get('/register-hospitals', function(req, res, next) {
  res.render('hospital-registeration');
});
router.get('/successfully-registered', function(req, res, next) {
  res.send('sir');
});




router.post("/register-user", function(req, res){
  let userData = new userModel({
    username:req.body.username,
    name: req.body.name, 
    email: req.body.email,
    password: req.body.password
  });
  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/patient-profile");
    });
  })
  .catch(function(err) {
    // Handle registration errors, perhaps send a response with an error message
    res.status(500).send("Registration failed: " + err.message);
  });
});


router.post("/login-user", passport.authenticate("local", {
  successRedirect: "/patient-profile",
  failureRedirect: "/login-user"
}),function(req, res){
});


router.get("/logout", function(req, res) {
  // req.logout(); // No need for the callback function
  res.redirect("/");
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login-user");
}



module.exports = router;
