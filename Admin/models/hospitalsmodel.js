// const mongoose = require('mongoose');
// // const passportLocalMongoose = require('passport-local-mongoose');

// // Schema banayein for hospitals
// const hospitalSchema = new mongoose.Schema({
// //   username: String,    // Hospital ka username
//   name: String,        // Hospital ka naam
//   email: String,       // Hospital ka email
// //   password: String,    // Hospital ka password
//   address: String,     // Hospital ka address
//   contactNumber: String,  // Hospital ka contact number

//   registrationDate: { type: Date, default: Date.now },  // Hospital ka registration date
//   isVerified: { type: Boolean, default: false },  // Hospital ka verification status
// });

// // Passport-local-mongoose plugin ko schema mein integrate karein
// // hospitalSchema.plugin(passportLocalMongoose);

// // Model banayein "Hospital" naam se jo hospitalSchema ka use karega
// module.exports = mongoose.model("Hospital", hospitalSchema);









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
  isApproved: {
    type: Boolean,
    default: false,
  },/**############ */


  
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
