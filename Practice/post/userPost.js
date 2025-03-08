const userModel = require("../modals/users");
app.post("/signup", function(req, res){
    let userData = new userModel({
      username:req.body.username,
      name: req.body.name, 
      email: req.body.email,
      password: req.body.password
    });
    userModel.register(userData, req.body.password)
    .then(function(){
      passport.authenticate("local")(req, res, function(){
        res.redirect("/");
      });
    })
    .catch(function(err) {
      // Handle registration errors, perhaps send a response with an error message
      res.status(500).send("Registration failed: " + err.message);
    });
  });