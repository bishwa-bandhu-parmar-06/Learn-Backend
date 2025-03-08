// routes/index.js
const express = require('express');
const router = express.Router();

const userModel = require('../models/usersmodel');
const hospitalModel = require('../models/hospitalsmodel');
const adminModel = require('../models/adminModel');


const passport = require('passport');
const session = require('express-session');


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


// passport-config.js
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());




router.get('/', function (req, res) {
  res.render('home');
});

router.get("/signup", function (req, res) {
  res.render("signup");
});



router.post("/signup", function (req, res) {
  let userData = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  userModel.register(userData, req.body.password)
    .then(function (user) {
      // Assign the hospital ID to the user
      user.hospital = req.body.hospitalId;
      user.save();

      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    })
});



router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login"
}), function (req, res) {
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

/* ###############################  HOSPITALS   ######################################## */

router.get("/add", function (req, res) {
  res.render("hospitalsreg");
});

router.post("/add", async function (req, res) {
  try {
    // Perform data validation here if needed

    let hospitalsData = new hospitalModel({
      gstin: req.body.gstin,
      licenseNumber: req.body.licenseNumber,
      certifiedProofDocument: req.body.certifiedProofDocument,
      hospitalName: req.body.hospitalName,
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      },
      directors: {
        name: req.body.directorName,
        contactNumber: req.body.directorContact,
      },
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      isApproved: false, /**############ */
    });

    // Save the hospital data to the database
    await hospitalsData.save();

    console.log('Hospital added successfully');
    // Render the success.ejs file
    res.render('home', { message: 'Hospital added successfully' });
  } catch (err) {
    console.error('Error adding hospital:', err);
    // Handle the error and send an appropriate response
    res.status(500).send('Internal Server Error');
  }
});


/*############################  ADMIN   ############################################# */


passport.use(new LocalStrategy(adminModel.authenticate()));
passport.serializeUser(adminModel.serializeUser());
passport.deserializeUser(adminModel.deserializeUser());



// Inside your /adminprofile route
router.get('/adminprofile', isLoggedIn, async function (req, res) {
  res.render("adminprofile");
});


router.post('/approve-hospital/:hospitalId', isLoggedIn, async function (req, res) {
  try {
    const { hospitalId } = req.params;
    await hospitalModel.findByIdAndUpdate(hospitalId, { isApproved: true });
    res.redirect('/adminprofile');
  } catch (err) {
    console.error('Error approving hospital registration:', err);
    res.status(500).send('Internal Server Error');
  }
});




// Route for user login form
router.get('/adminlogin', function (req, res) {
  res.render('adminlogin');
});


router.get('/admin/register', (req, res) => {
  res.render('adminRegister');
});

// Route to handle user registration
// router.post('/admin/register', function (req, res) {
//   let adminData = new adminModel({
//     username: req.body.username,
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   });

//   adminModel.register(adminData, req.body.password)
//     .then(() => {
//       passport.authenticate('local')(req, res, function () {
//         // console.log('Redirecting to /adminprofile');

//         res.redirect('/adminprofile');
//       });
//     })
//     .catch((err) => {
//       console.error('Error registering user:', err);
//       res.status(500).send('Internal Server Error');
//     });
// });

router.post('/admin/register', function (req, res) {
  let adminData = new adminModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  adminModel.register(adminData, req.body.password)
    .then(() => {
      console.log('Admin registered successfully');
      passport.authenticate('local')(req, res, function () {
        console.log('Redirecting to /adminprofile');
        res.redirect('/adminprofile');
      });
    })
    .catch((err) => {
      console.error('Error registering admin:', err);
      res.status(500).send('Internal Server Error');
    });
});






// Route to handle user login
router.post('/adminlogin', passport.authenticate('local', {
  successRedirect: '/adminprofile',
  failureRedirect: '/adminlogin'
}), function (req, res) {});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}



module.exports = router;






// // routes/index.js
// const express = require('express');
// const router = express.Router();

// const userRoutes = require('./userRoutes');
// const hospitalsRoutes = require('./hospitalsRoutes');

// router.use(userRoutes); // Mount user-related routes
// router.use(hospitalsRoutes); // Mount hospital-related routes

// router.get('/', function(req, res){
//   res.render("home");
// });


// module.exports = router;
