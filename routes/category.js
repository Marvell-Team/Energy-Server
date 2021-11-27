var express = require("express");
var router = express.Router();
var categoriesController = require("../controllers/categoryController");
const categoryModel = require("../models/categoryModel");

// router.get("/", async function (req, res, next) {
//     // let list = await categoryCotroller.getListCategories();
//     res.render("new-category");
//   });
  router.get("/:categorys", async  (req, res, next) => {
    let { categorys } = req.params;
    let users = await categoriesController.getListCategoriesbyCategorys(categorys);
    res.status(200).json(users);
  });
router.get("/add-category", async function (req, res, next) {
    let categories = await categoryCotroller.getListCategories();
    res.render("new-category", { categories, title: "Add Category" });
  });
  
  router.post("/add-category", async function (req, res, next) {
    // req.body = {...req.body, avatar: 'assets/images/' + req.file.originalname}
    let { body } = req;
    
    await categoryCotroller.addCategory(body, res);
    // res.redirect("/category");
  });
  router.post("/add", async  (req, res, next) => {
    let { body } = req;
    const {name_category,categorys,image}=body;
    const cate = new categoryModel({
      name_category:name_category,
      categorys:categorys,
      img_categorys:image,

    }) 
    const aa=await cate.save();
    res.status(200).json({status:1,data:aa});
  
});

  module.exports = router;