var express = require("express");
var router = express.Router();
var auth = require("../utilities/authen");
var upload = require("../utilities/upload");
var productController = require("../controllers/productController");
var userController = require("../controllers/userController");
var middle = [auth.authenticate, upload.single("imgProduct")];

router.get("/products", async function (req, res, next) {
  let products = await productController.getListProduct();
  res.send(products)
});

router.get("/products/:id", async function (req, res, next) {
  let { id } = req.params;
  let product = await productController.getProductById(id)
  res.send({product})
});

//api user
// router.get("/users/register", async function (req, res, next) {
//   let { body } = req;
//   let users = await userController.addNew(body, res);
//   res.send(users)
// });

module.exports = router;
