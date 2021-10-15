var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');
var auth = require ('../utilities/authen');

var users = [
  {id: 1, username: 'keokiet250', password: 'keokiet150' },
  {id: 2, username: 'admin', password: 'user' }
]

// HOME
router.get("/", auth.authenticate, function (req, res, next) {
  res.redirect('/product');
});

router.get("/category", function (req, res, next){
  res.render('new-category');
  // res.redirect('/category');
});

// Kiểm tra Login


// Nếu chưa login ---> Chạy Login


// Đã Login ---> Vào Class Home

// GET Login Page
router.get("/login", function (req, res, next) {
  res.render('login', {title: "Sign in"});
});

// POST Login Page
router.post("/login", function (req, res, next) {
  let {username, password} = req.body
  let user = users.find(us => us.username == username && us.password == password)
  if (user){
    // alert('Successfully')
    var token = jwt.sign ({user}, process.env.JWT_KEY);
    req.session.token = token
    res.redirect('/product')
  }else{
    res.redirect('/login')
  }
});

// GET logout
router.get("/logout", auth.authenticate, function (req, res, next) {

  req.session.destroy(function(err) {
  res.redirect('/login');
  })
});


module.exports = router;
