const mongoose = require('mongoose');

const connect = async () => {
    const dbURI = 'mongodb://127.0.0.1:27017/hospital_database'; // Corrected URI

    try {
        await mongoose.connect(dbURI, { serverSelectionTimeoutMS: 30000 }); // Simplified connection options
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(`MongoDB connection error: ${err.message}`);
        process.exit(1); // Exit process on connection failure
    }

    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('MongoDB disconnected through app termination');
        process.exit(0);
    });
};

module.exports = { connect };
