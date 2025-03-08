const express = require('express');
const app = express();

app.use(function(req, res, next){
  console.log("hello from middleware 1");
  next();
});

app.use(function(req, res, next){
  console.log("hello from middleware 2");
  next();
});

app.get('/', function (req, res) {
  res.send('Bikash Singh')
});
app.get('/profile', function (req, res) {
  res.send('Hello from Bikash Singh profile')
});
app.get('/contact', function (req, res) {
  res.send('You Can Contact to Bikash Singh 9142364660')
});

app.listen(3000);