require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const dbConfig = require('./database/config');
const cookieParser = require("cookie-parser");
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Import models
const Patient = require('./models/patientModel');
const Doctor = require('./models/doctorModel');
const Hospitals = require('./models/hospitalModel');
const Admin = require('./models/adminModel');

// Import routes
const patientRoutes = require('./routes/patient');
const adminRoutes = require('./routes/admin');
const doctorRoutes = require('./routes/doctor');
const hospitalRoutes = require('./routes/hospital');
const homeroutes = require("./routes/homeForm");
const deepartmentRoutes = require("./routes/deepartmentRoutes");
const ServicesRoutes = require("./routes/serviceRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);  // Ensure single instance of socket.io

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
dbConfig.connect();

// Set up static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session setup with environment variable for secret
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret-key',
    resave: true,
    saveUninitialized: true
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Cookie parsing middleware
app.use(cookieParser());

// Flash messages middleware
app.use(flash());
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/patient', patientRoutes);
app.use('/admin', adminRoutes);
app.use('/doctor', doctorRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/visitors', homeroutes);
app.use("/departments", deepartmentRoutes);
app.use("/services", ServicesRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.set('socketio', io);

// Search route
app.get('/search', async (req, res) => {
    const query = req.query.q; // Get the search query from the URL
    if (!query || query.trim() === '') {
        return res.render('error', { error: 'Please enter a valid search query.' });
    }

    try {
        const patients = await Patient.find({$text: { $search: query } });
        const doctors = await Doctor.find({$text: { $search: query } });
        const hospitals = await Hospitals.find({ $text: { $search: query } }).select('name');
        const admin = await Admin.find({$text: { $search: query } });

        res.render('searchResults', { patients, doctors, hospitals, admin, query });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).render('error', { error: 'Internal Server Error' });
    }
});

// Suggest route
app.get('/suggest', async (req, res) => {
    const query = req.query.q; // Get the search query from the URL
    if (!query || query.trim() === '') {
        return res.json([]);
    }

    try {
        const doctors = await Doctor.find({ name: { $regex: `^${query}`, $options: 'i' } }).limit(5);
        const patients = await Patient.find({ name: { $regex: `^${query}`, $options: 'i' } }).limit(5);
        const hospitals = await Hospitals.find({ name: { $regex: `^${query}`, $options: 'i' } }).limit(5);
        const admin = await Admin.find({ name: { $regex: `^${query}`, $options: 'i' } }).limit(5);

        const suggestions = [...doctors, ...patients, ...hospitals, ...admin];
        res.json(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle invalid routes
// app.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// });

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
