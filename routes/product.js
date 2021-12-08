var express = require("express");
var router = express.Router();
var auth = require("../utilities/authen");
var upload = require("../utilities/upload");
var productController = require("../controllers/productController");
var categoryCotroller = require("../controllers/categoryController");
var middle = [auth.authenToken, upload.single("imgProduct")];
var middle2 = [auth.authenToken, upload.array("imgProduct2")];

router.get("/", async function (req, res, next) {
  const { body } = req;
  let list = await productController.getListProduct(body);
  res.status(200).json(list);
});
router.post("/lsr", async function (req, res, next) {
  const { body } = req;
  let list = await productController.getListProductLSR(body);
  res.status(200).json(list);
});
router.get("/like", async function (req, res, next) {
  let list = await productController.getListLikeProduct();
  // res.render("product", { listTable: list, title: "Yame Admin" });
  res.status(200).json(list);
});
router.get("/:categorys", async function (req, res, next) {
  let { categorys } = req.params;
  const { body } = req;
  console.log(categorys + "aa");
  let list = await productController.getListProductByCategory(categorys, body);
  // res.render("product", { listTable: list, title: "Yame Admin" });
  res.status(200).json(list);
});
router.post("/categorys/:id", async function (req, res, next) {
  let { id } = req.params;
  let { body } = req;
  let list = await productController.getListProductByIdCategorys(id, body);
  // res.render("product", { listTable: list, title: "Yame Admin" });
  res.status(200).json(list);
});
router.get("/id/:id", async function (req, res, next) {
  let { id } = req.params;
  let list = await productController.getProductById(id);
  // res.render("product", { listTable: list, title: "Yame Admin" });
  res.status(200).json(list);
});

router.get("/add-product", async function (req, res, next) {
  let product = await categoryCotroller.getListCategories();
  res.status(200).json(product);
});

//them san pham
router.post("/", async function (req, res, next) {
  // req.body = {...req.body, avatar: 'assets/images/' + req.file.originalname}
  let { body } = req;
  // console.log(req.files)
  const images = await productController.addImage(body.nameImage);
  body = { ...body, id_image: images._id };
  const product = await productController.addNew(body, res);
  res.status(200).json(product);
  // res.redirect("/class");
});

// Hàm chỉnh sửa
router.post("/edit-product/:id", async function (req, res, next) {
  let { id } = req.params;
  let { body } = req;
  const product = await productController.edit(id, body);
  res.status(200).json(product);
});

// Hàm chỉnh sửa
router.get("/store/:id", async function (req, res, next) {
  let { id } = req.params;
  const product = await productController.getProductByStore(id);
  res.status(200).json(product);
});

// Delete
router.delete("/delete/:id", async function (req, res, next) {
  let id = req.params.id;
  const product = await productController.remove(id);
  res.status(200).json(product);
});
router.post("/image", middle2, async function (req, res, next) {
  // req.body = {...req.body, avatar: 'assets/images/' + req.file.originalname}

  if (req.files) {
    let imgUrl = [];
    const file = req.files;
    for (var i = 0; i < file.length; i++) {
      imgUrl.push(
        "http://localhost:3000/public/assets/images/" + file[i].filename
      );
    }
    console.log(imgUrl);
    body = { nameImage: imgUrl };
  }
  const images = await productController.addImage(body, res);
  res.status(200).json(images);
});

module.exports = router;
