const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Doctor schema definition
const doctorSchema = new mongoose.Schema({
    // Doctor-specific fields
    username: { 
        type: String, 
        unique: true, 
        required: true 
    },
    name: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    password: { 
        type: String, 
        required: true
    },
    role: { 
        type: String,
        default: 'doctor'
    },
    speciality: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String
    } // Profile image field
});

// Add Passport-local-mongoose plugin to Doctor schema
doctorSchema.plugin(passportLocalMongoose);

// Index the 'name' field for text search
doctorSchema.index({ name: 'text' });

// Create the Doctor model with explicit collection name if needed
const Doctor = mongoose.model('Doctor', doctorSchema, 'doctors'); // Explicitly set collection name

module.exports = Doctor;
