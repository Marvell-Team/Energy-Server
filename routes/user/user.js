var express = require('express');
var router = express.Router();
var userController = require("../../controllers/userController");
var auth = require("../../utilities/authen");
var upload = require("../../utilities/upload");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
var middle = [auth.authenToken];

router.get("/", async  (req, res, next) => {
  let { id } = req;
  let users = await userController.getListUser();
  res.status(200).json(users);

});

router.get("/:id",middle, async function (req, res, next) {
  
  let { id } = req.params;
  console.log(id+"id")
  let users = await userController.getUserById(id);
  res.status(200).json(users);
});

router.get("/admin/:id", async function (req, res, next) {
  
  let { id } = req.params;
  console.log(id+"id")
  let users = await userController.getUserById(id);
  res.status(200).json(users);
});

// Hàm chỉnh sửa
router.post("/edit-user/:id",middle, async function (req, res, next) {
  let { id } = req.params;
  let { body } = req;
  console.log(req.file)
  
  const users= await userController.edit(id, body);
  res.status(200).json(users);
});

//tao User
router.post("/",async function (req, res, next) {
  let { body } = req;
  let users = await userController.addNew(body, res);
  res.status(200).json(users);
});
module.exports = router;

//tao User
router.get("/admin/:id",async function (req, res, next) {
  let { id } = req.params;
  console.log(id+"id")
  let users = await userController.getUserById(id);
  res.status(200).json(users);
});
module.exports = router;

router.get("/active/:id",async function (req, res, next) {
  let { id } = req.params;
  let users = await userController.blockUser(id);
  res.status(200).json(users);
});
module.exports = router;
