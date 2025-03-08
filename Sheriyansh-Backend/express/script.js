const express = require('express')
const app = express();

app.use(function(req, res, next) {
    console.log("hello from middleware 1");
    next();
});
app.use(function(req, res, next) {
    console.log("hello from middleware 2");
    next();
});

app.get('/', function (req, res) {
    //here "/" is the route or path
  res.send('Hello bikash');
});
app.get('/profile', function (req, res) {
    //here "/" is the route or path
  res.send(' bikash ji');
});
app.get('/contact', function (req, res) {
    //here "/" is the route or path
  res.send(' 9142364660');
});

app.listen(3000);