var express = require('express');
var router = express.Router();

const usermodel = require("./users");
const passport = require('passport');

const LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(usermodel.authenticate()));


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/profile', isLoggedIn ,function(req, res) {
  res.render("profile");
});
  

router.post('/register', function(req, res) {
  var userdata = new usermodel({
    username: req.body.username,
    secret: req.body.secret
  });
  usermodel.register(userdata, req.body.password)
  .then(function(registeredUser){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile");
    });
  });
});


router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function(req, res){});

router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err) return next(err);
    res.redirect("/");
  });
  res.redirect("/");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}




module.exports = router;



// router.get('/create', async function(req, res) {
//   let userdata = await usermodel.create({
//     username: "ankita",
//     nickname: "ankitakumari",
//     description: "army",
//     categories: ['army', 'officers', 'navy'],
//   });
//   res.send(userdata);
// });


//how can i perform a case-insensitive in mongoose?
// router.get('/find', async function(req, res){
//   var regex = new RegExp("^Ankit$", "i")
//   let user = await usermodel.find({username: regex});
//   res.send(user);
// });


//how do i find documents where an array field contains all of set of values?
// router.get('/find', async function(req, res){
//   let user = await usermodel.find({categories: {$all: ['node', 'express']}}); 
//   //isme categories me jo bhi array hai usme se jo bhi value hai wo sare honi chahiye
//   res.send(user);
// });


//how can i search for documents with a specific date range in mongoose?
// router.get('/find', async function(req, res){
//   var date1 = new Date("2023-11-28");
//   var date2 = new Date("2023-11-30");
//   let user = await usermodel.find({datecreated: {$gte: date1, $lte: date2}});
//   res.send(user);
// });


//how can i filter documentsbased on the existence of a field in mongoose?
// router.get('/find', async function(req, res){
//   let user = await usermodel.find({nickname: {$exists: true}});
//   res.send(user);
// });


//how can i filter documents based on specific fields length in mongoose?
// router.get('/find', async function(req, res){
//   let user = await usermodel.find({
//     $expr: {
//       $and: [
//         {$gte: [{$strLenCP: "$nickname"}, 0]},
//         {$lte: [{$strLenCP: "$nickname"}, 10]},
//       ]
//     }
//   });
//   res.send(user);
// });




//agr login ho jaye to login page k bad profile page dikhao
  //agr login na ho to fir mujhe is route se dusre route pe bhej do jaise ki /error pe and waha pe error message show kardo
  //flash message apko  ye allow karte hai ki aap is route me bane hue data ko dusre route me use kar sakte ho.
// router.get('/failed', function(req, res) {
//   req.flash("age", 12);
//   req.flash("name", "saurabh");
//   res.send("ban gaya");
// });


// router.get("/checkkro",function(req, res){
//   console.log(req.flash("age"));
//   console.log(req.flash("name"));
//   res.send("check kar lo backend k terminal par");
// });

