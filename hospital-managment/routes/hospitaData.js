const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  gstin: {
    type: String,
    required: true,
    unique: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  certifiedProofDocument: {
    type: String,
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  directors: [
    {
      name: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: String,
        required: true,
      },
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  // Add other relevant fields as needed

  // Timestamps for tracking creation and update times
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
