var express = require('express');
var router = express.Router();
const config=require("../config")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
function checkLogin(req, res, next){
  if(!req.session.user)
    res.redirect("/login");
  else
    next();
}

router.get("/login", (req, res, next)=>{
  req.session.user =null
  res.render("login", {login:"", message:""})
});
router.post("/login", (req, res, next)=>{
  if(req.body.login==config.login && req.body.password==config.password) {
    req.session.user = config.login;
    res.redirect("admin")
  }
  else{
    res.render("login", {login:req.body.login, message:"password is no correct"})
  }
});


router.get('/admin', checkLogin, function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

module.exports = router;
