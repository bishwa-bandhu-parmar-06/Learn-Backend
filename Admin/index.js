const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Set the views engine to 'ejs'
app.set('view engine', 'ejs');

// Set the views directory to the 'views' folder
app.set('views', __dirname + '/views');

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Require the database connection
const db = require('./connectDb/db');

// Require and use the routes from the 'routes' folder
const routes = require('./routes/index');
app.use(routes);

// const hospitalRoutes = require("./routes/hospitalsRoutes");
// app.use(hospitalRoutes);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
