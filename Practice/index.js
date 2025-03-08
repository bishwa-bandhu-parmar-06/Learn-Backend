const express = require('express');
const port = 3000;
const path = require('path');

require('./db/connection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}) 