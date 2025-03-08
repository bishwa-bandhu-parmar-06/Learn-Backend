var express = require('express');
var router = express.Router();

const usermodel = require("./users");


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/",function(req, res){
  res.render("index");
});




//THIS IS FOR COOKIES
// router.get("/",function(req, res){
//   res.cookie("age", 25);
//   res.render("index");
// });
// router.get("/read",function(req, res){
//   console.log(req.cookies);
//   res.send("read cookies");
// });

// router.get("/delete",function(req, res){
//   res.clearCookie("age");
//   res.send("clear cookies");
// });







//THIS IS FOR SESSION
// router.get("/",function(req, res){
//   req.session.koibhiname = true;
//   res.render("index");
// });

// router.get("/checkban",function(req, res){
//   if(req.session.koibhiname === true){
//     res.send("you are banned");
//   }
//   else{
//     res.send("you are not banned");
//   }
// });

// router.get("/removeban",function(req, res){
//   req.session.destroy(function(err){
//     if (err) throw err;
//     res.send("ban removed");
//   });
// });



//THIS IS FOR MONGODB
// router.get("/create", async function(req, res){
//   const createduser = await usermodel.create({
//     username: "Bikash",
//     name: "bishwabandhu",
//     age: 20
//   });
//   res.send(createduser);
// });

// router.get("/allusers", async function(req, res){
//   let allusers = await usermodel.find();
//   res.send(allusers);
// });

// router.get("/oneusers", async function(req, res){
//   let oneusers = await usermodel.findOne({
//     username: "Bikash"
//   });
//   res.send(oneusers);
// });

// router.get("/delete", async function(req, res){
//   const deleteduser = await usermodel.findOneAndDelete({
//     username: "Bikash"
//   });
//   res.send(deleteduser);
// });

module.exports = router;
