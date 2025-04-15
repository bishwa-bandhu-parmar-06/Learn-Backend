const dotenv = require("dotenv");
dotenv.config(); // Moved up, only needs to be called once

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDb = require("./config/dataBase");

// Routes
const adminRoutes = require("./routes/adminRoutes");
const menuRoutes = require('./routes/menuRoutes');
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require("./routes/orderRoutes");
const orderReceivedRoutes = require("./routes/orderReceiveRoutes");

const app = express();



// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));

// Remove COOP and COEP headers if they exist
app.use((req, res, next) => {
  res.removeHeader('Cross-Origin-Opener-Policy');
  res.removeHeader('Cross-Origin-Embedder-Policy');
  next();
});


app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// API Routes
app.use("/api/admin", adminRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/orderreceived", orderReceivedRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("BhojanQR API is Running...");
});




// Connect to DB
connectDb();

// Server Listening
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});