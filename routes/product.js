var express = require("express");
var router = express.Router();
var auth = require("../utilities/authen");
var upload = require("../utilities/upload");
var productController = require("../controllers/productController");
var categoryCotroller = require("../controllers/categoryController");
var middle = [auth.authenticate, upload.single("imgProduct")];

router.get("/", middle, async function (req, res, next) {
  let list = await productController.getListProduct();
  res.render("product", { listTable: list, title: "Yame Admin" });
});


router.get("/add-product", async function (req, res, next) {
  let store = await categoryCotroller.getListCategories();
  res.render("new-product", { store, title: "Add Product" });
});

router.post("/add-product", middle, async function (req, res, next) {
  // req.body = {...req.body, avatar: 'assets/images/' + req.file.originalname}
  let { body } = req;
  if (req.file) {
    let imgUrl = req.file.originalname;
    body = { ...body, imgProduct: imgUrl };
  }
  await productController.addNew(body, res);
  // res.redirect("/class");
});

// Set data từ form
router.get(
  "/edit-product/:id",
  auth.authenticate,
  async function (req, res, next) {
    let id = req.params.id;
    let ch = await productController.getProductById(id);
    let store = await categoryCotroller.getListCategories();
    res.render("edit-product", { product: ch, store, title: "Edit Product" });
  }
);

// Hàm chỉnh sửa
router.post("/edit-product/:id", middle, async function (req, res, next) {
  let { id } = req.params;
  let { body } = req;
  if (req.file) {
    let imgUrl = req.file.originalname;
    body = { ...body, imgProduct: imgUrl };
  }
  await productController.edit(id, body);
  res.redirect("/product");
});
// Delete
router.delete(
  "/delete/:id",
  auth.authenticate,
  async function (req, res, next) {
    let id = req.params.id;
    await productController.remove(id);
    res.send({ res: true });
  }
);

module.exports = router;
