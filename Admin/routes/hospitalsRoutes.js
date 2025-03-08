// hospitalRoutes.js
const express = require('express');
const router = express.Router();
const hospitalModel = require('../models/hospitalsmodel');

// Route to render hospital registration form
router.get('/add', function (req, res) {
  res.render('hospitalsreg');
});

// Route to handle hospital registration
router.post('/add', async function (req, res) {
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
      contactNumber: req.body.contactNumber
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

module.exports = router;
