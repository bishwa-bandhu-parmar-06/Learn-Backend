// connectDb/db.js
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/ownerDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

module.exports = db;
