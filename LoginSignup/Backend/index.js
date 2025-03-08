const express = require('express')
const app = express()
require("dotenv").config();
require('./Config/db')();

const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
app.get('/', function (req, res) {
  res.send('Hello World')
})


app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    }
)