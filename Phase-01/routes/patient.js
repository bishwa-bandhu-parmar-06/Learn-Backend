const express = require('express');
const router = express.Router();
const Patient = require('../models/patientModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const SECRETKEY = "NOTESAPI";
const cookieParser = require("cookie-parser");
const authenticate = require("../middleware/auth");
const path = require('path');
const multer = require('multer');
const Notification = require('../models/notificationModel'); // Ensure the Notification model is imported
const bodyParser = require('body-parser');

// Middleware to parse request body
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

router.use(cookieParser()); // Initialize cookie-parser middleware

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Render patient signup form
router.get('/patient-signup', (req, res) => {
    res.render('register');
});

router.post("/patient/patient-signup", async (req, res) => {
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    const mobilenumber = req.body.mobilenumber;
    const username = req.body.username;
    const email = req.body.email;

    console.log('Request body:', req.body);

    if (password !== cpassword) {
        req.flash("error", "Passwords do not match.");
        return res.redirect("/patient-signup");
    }

    try {
        console.log('Checking for existing patient with mobile number:', mobilenumber);
        const existingPatientByMobile = await Patient.findOne({ mobilenumber: mobilenumber });
        console.log('Checking for existing patient with username:', username);
        const existingPatientByUsername = await Patient.findOne({ username: username });
        console.log('Checking for existing patient with email:', email);
        const existingPatientByEmail = await Patient.findOne({ email: email });

        if (existingPatientByMobile) {
            console.log('Found existing patient by mobile:', existingPatientByMobile);
            req.flash('error', 'Patient with this mobile number already exists.');
            return res.redirect('/patient-signup');
        }

        if (existingPatientByUsername) {
            console.log('Found existing patient by username:', existingPatientByUsername);
            req.flash('error', 'Patient with this username already exists.');
            return res.redirect('/patient-signup');
        }

        if (existingPatientByEmail) {
            console.log('Found existing patient by email:', existingPatientByEmail);
            req.flash('error', 'Patient with this email already exists.');
            return res.redirect('/patient-signup');
        }

        // Create new Patient instance
        const patientData = new Patient({
            username: username,
            name: req.body.name,
            password: password,
            mobilenumber: mobilenumber,
            email: email,
            dob: req.body.dob,
            gender: req.body.gender,
            State: req.body.State,
            District: req.body.District,
            City: req.body.City,
            Pincode: req.body.Pincode,
            role: 'patient',
        });

        await patientData.save();

        // Redirect to patient login page after successful signup
        res.redirect('/patient/patient-login');
    } catch (error) {
        console.error('Error during patient signup:', error);
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/patient-signup');
    }
});

// Render patient profile
router.get('/patient-profile', authenticate, async (req, res) => {
    try {
        const patientId = req.user._id;
        const patient = await Patient.findById(patientId);

        if (patient) {
            res.render('patientProfile', { patient });
        } else {
            res.status(404).send('Patient not found');
        }
    } catch (error) {
        console.error('Error fetching patient profile:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Render patient login form
router.get('/patient-login', (req, res) => {
    res.render('login');
});

// Render edit details page
router.get('/edit-details', async (req, res) => {
    try {
        const token = req.cookies.jwtName;
        if (!token) {
            return res.redirect('/');
        }

        const decoded = jwt.verify(token, SECRETKEY);
        const patient = await Patient.findById(decoded._id);

        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        res.render('patientdetailsEdit', { patient });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Handle edit details form submission
router.post('/edit-details', authenticate, upload.single('profileImage'), async (req, res) => {
    try {
        const token = req.cookies.jwtName;
        if (!token) {
            return res.redirect('/');
        }

        const decoded = jwt.verify(token, SECRETKEY);
        const {
            name,
            username,
            email,
            mobilenumber,
            dob,
            gender,
            State,
            District,
            City,
            Pincode
        } = req.body;

        const updatedFields = {
            name,
            username,
            email,
            mobilenumber,
            dob,
            gender,
            State,
            District,
            City,
            Pincode
        };

        if (req.file) {
            updatedFields.profileImage = req.file.filename;
        }

        await Patient.findByIdAndUpdate(decoded._id, updatedFields);

        res.redirect('/patient/patient-profile');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Handle patient logout
router.post('/patient-logout', (req, res) => {
    res.cookie("jwtName", "", { expires: new Date(0), httpOnly: true });
    res.redirect('/');
});

module.exports = router;
