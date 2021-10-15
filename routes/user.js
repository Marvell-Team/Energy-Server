var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.get("/", async function (req, res, next) {
  let { id } = req;
  let users = await userController.getListUser();
  res.send(users)
});

router.get("/:id", async function (req, res, next) {
  let { id } = req;
  let users = await userController.getUserById(id);
  res.send(users)
});


router.post("/", function (req, res, next) {
  let { body } = req;
  let users = userController.addNew(body, res);
  res.json(users)
});



module.exports = router;
