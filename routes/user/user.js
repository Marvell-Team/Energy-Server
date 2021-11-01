var express = require('express');
var router = express.Router();
var userController = require("../../controllers/userController");
var auth = require("../../utilities/authen");
var upload = require("../../utilities/upload");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
var middle = [auth.authenToken, upload.single("imgProduct")];

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

// Hàm chỉnh sửa
router.post("/edit-user/:id",middle, async function (req, res, next) {
  let { id } = req.params;
  let { body } = req;
  console.log(req.file)
  if (req.file) {
    let imgUrl = req.file.filename;
    body = { ...body, avt_user: "http://localhost:3000/public/assets/images/"+imgUrl };
  }
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
