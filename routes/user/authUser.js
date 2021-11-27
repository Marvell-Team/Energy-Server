var express = require('express');
var router = express.Router();
var userController = require("../../controllers/userController");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/login', async (req, res) =>{
    let { body } = req;
  let users = await userController.login(body);
  res.json(users);
  })
module.exports = router;
