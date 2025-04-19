const dotenv = require("dotenv")
dotenv.config();
const connectDB = require("./config/dbconfig")
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");
const Port = process.env.PORT || 5000
const app = express();
app.use(cors());
connectDB();

app.use("/", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(Port, () => console.log(`Server running on port ${Port}`));
