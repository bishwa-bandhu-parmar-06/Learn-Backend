// userRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('../passport-config'); // Import Passport configuration
const userModel = require('../models/usersmodel');

// Route for user signup form
router.get('/signup', function (req, res) {
  res.render('signup');
});

// Route to handle user registration
router.post('/signup', function (req, res) {
  let userData = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  userModel.register(userData, req.body.password)
    .then(() => {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      });
    })
    .catch((err) => {
      console.error('Error registering user:', err);
      res.status(500).send('Internal Server Error');
    });
});

// Route to render user profile page
router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile');
});

// Route for user login form
router.get('/login', function (req, res) {
  res.render('login');
});

// Route to handle user login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}), function (req, res) {});

// Middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
