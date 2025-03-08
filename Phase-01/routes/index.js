// routes/index.js

const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel');
const Patient = require("../models/patientModel");
const Admin = require("../models/adminModel");

// Home Page
router.get('/', async (req, res) => {
    const token = req.cookies.jwtName;
    const doctor = await Doctor.find();
    const patient = await Patient.find();
    const admin = await Admin.find();
    res.render('home', { token: token, doctor, patient, admin });
});

router.get("/visitors", (req, res) => {
    res.render("home");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

router.get("/department", (req, res) => {
    res.render("departments");
});

// Patient Routes
router.get('/patient-signup', async (req, res) => {
    const token = req.cookies.jwtName;
    const patient = await Patient.find();
    res.render('register', { token: token, patient });
});

// Hospital Registration Routes
router.get('/hospital-registeration', (req, res) => {
    res.render('register-hospital');
});

router.get('/patient-login', (req, res) => {
    res.render('login');
});

// Doctor Routes
router.get('/doctor-signup', (req, res) => {
    res.render('doctorSignup');
});

router.get('/doctor-login', (req, res) => {
    res.render('doctorLogin');
});

// Admin Routes
router.get('/admin-signup', (req, res) => {
    res.render('adminSignup');
});

router.get('/admin-login', (req, res) => {
    res.render('adminLogin');
});

// All Doctors
router.get('/allDoctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        const token = req.cookies.jwtName;
        res.render('allDoctors', { doctors, token: token });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
