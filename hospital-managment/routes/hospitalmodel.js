const express = require('express');
const router = express.Router();
const Hospital = require('./hospitaData');

// Parse JSON bodies for this router
router.use(express.json());

router.post('/register-hospital', async (req, res) => {
    // Extract hospital data from the request body
    const hospitalsData = new Hospital({
        gstin: req.body.gstin,
        licenseNumber: req.body.licenseNumber,
        certifiedProofDocument: req.body.certifiedProofDocument,
        hospitalName: req.body.hospitalName,
        address: req.body.address,
        directors: req.body.directors,
        email: req.body.email,
        contactNumber: req.body.contactNumber
    });

    // Save hospital data in the database
    hospitalsData.save()
        .then(function () {
            // Handle the successful registration
            res.redirect("/");
        })
        .catch(function (err) {
            // Handle registration errors, perhaps send a response with an error message
            res.status(500).send("Registration failed: " + err.message);
        });
});

module.exports = router;
