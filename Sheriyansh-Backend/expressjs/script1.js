const express = require('express')
const app = express();

app.use(function(req, res, next){
    console.log("hello middleware");
    next();
});

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get("/profile", function(req, res){
    res.send("hello from profile");
});

// app.get("/profile/bikash", function(req, res){
//     res.send("hello from bikash profile");
// });
//static username

app.get("/profile/:username", function(req, res){
    res.send(`hello from ${req.params.username} profile`);
});
//the above code is dynamic username

app.listen(3000);