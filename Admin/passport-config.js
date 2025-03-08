const express = require('express');
const router = express.Router();

const session = require('express-session');

// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// passport-config.js
const userModel = require('./models/usersmodel');  // Assuming usersModel.js is in the same directory
// const hospitalModel = require('../models/hospitalsmodel');

// Configure express-session middleware
router.use(session({
    secret: 'your-secret-key', // Replace with a secure key
    resave: true,
    saveUninitialized: true
}));
  
  // Initialize Passport
router.use(passport.initialize());
router.use(passport.session());

// Middleware to parse JSON and urlencoded request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// Additional configuration for hospital model if needed

module.exports = passport;
