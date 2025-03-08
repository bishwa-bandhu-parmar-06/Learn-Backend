const express = require("express");
const app = express();
app.set("view engine","ejs");
app.use(express.static("./public"));

app.get("/",function(req,res){
    res.send("Hello bikash");
});

app.get("/task",function(req, res){
    res.render("task");
});

app.listen(3000);