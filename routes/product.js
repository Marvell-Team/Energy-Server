var express = require("express");
var router = express.Router();
var auth = require("../utilities/authen");
var upload = require("../utilities/upload");
var productController = require("../controllers/productController");
var categoryCotroller = require("../controllers/categoryController");
var middle = [auth.authenToken, upload.single("imgProduct")];
var middle2 = [auth.authenToken, upload.array("imgProduct2")];

router.get("/", async function (req, res, next) {
  let list = await productController.getListProduct();
 // res.render("product", { listTable: list, title: "Yame Admin" });
  res.status(200).json(list)
});
router.get("/like", async function (req, res, next) {
  let list = await productController.getListLikeProduct();
 // res.render("product", { listTable: list, title: "Yame Admin" });
  res.status(200).json(list)
});
router.get("/:categorys", async function (req, res, next) {
  let { categorys } = req.params;
  console.log(categorys+'aa');
  let list = await productController.getListProductByCategory(categorys);
 // res.render("product", { listTable: list, title: "Yame Admin" });
  res.status(200).json(list)
});
router.get("/id/:id", async function (req, res, next) {
  let { id } = req.params;
  let list = await productController.getProductById(id);
 // res.render("product", { listTable: list, title: "Yame Admin" });
  res.status(200).json(list)
});


router.get("/add-product", async function (req, res, next) {
  let product = await categoryCotroller.getListCategories();
  res.status(200).json(product);
});

//them san pham
router.post("/", upload.array("imgProduct2"), async function (req, res, next) {
  // req.body = {...req.body, avatar: 'assets/images/' + req.file.originalname}
  let { body } = req;
  if (req.files) {
    let imgUrl=[];
    const file=req.files
    for(var i=0;i<file.length;i++){
      imgUrl.push("http://localhost:3000/public/assets/images/"+file[i].filename);
    }
    console.log(imgUrl)
    let body1 = { nameImage: imgUrl };
    const images=await productController.addImage(body1, res);
    body = { ...body, id_image: images._id };
    const product= await productController.addNew(body, res);
    res.status(200).json(product);
  }
  
  
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
router.post("/image", middle2, async function (req, res, next) {
  // req.body = {...req.body, avatar: 'assets/images/' + req.file.originalname}
  
  if (req.files) {
    let imgUrl=[];
    const file=req.files
    for(var i=0;i<file.length;i++){
      imgUrl.push("http://localhost:3000/public/assets/images/"+file[i].filename);
    }
    console.log(imgUrl)
    body = { nameImage: imgUrl };
  }
  const images= await productController.addImage(body, res);
  res.status(200).json(images);
});

module.exports = router;
