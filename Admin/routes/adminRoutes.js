// adminRoutes.js
const express = require('express');
const router = express.Router();

const passport = require('../passport-config'); // Import Passport configuration

const adminModel = require('../models/adminModel');

router.get('/admin/register', (req, res) => {
  res.render('adminRegister');
});

// Route to handle user registration
router.post('/admin/register', function (req, res) {
    let adminData = new adminModel({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
  
    adminModel.register(adminData, req.body.password)
      .then(() => {
        passport.authenticate('local')(req, res, function () {
          res.redirect('/adminprofile');
        });
      })
      .catch((err) => {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
      });
  });
  
  // Route to render user profile page
  router.get('/adminprofile', isLoggedIn, function (req, res) {
    res.render('adminprofile');
  });
  
  // Route for user login form
  router.get('/adminlogin', function (req, res) {
    res.render('adminlogin');
  });
  
  // Route to handle user login
  router.post('/adminlogin', passport.authenticate('local', {
    successRedirect: '/adminprofile',
    failureRedirect: '/adminlogin'
  }), function (req, res) {});
  
  // Middleware to check if the user is authenticated
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
  

module.exports = router;
