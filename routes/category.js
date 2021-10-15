var express = require("express");
var router = express.Router();
var categoryCotroller = require("../controllers/categoryController");

router.get("/", async function (req, res, next) {
    // let list = await categoryCotroller.getListCategories();
    res.render("new-category");
  });

router.get("/add-category", async function (req, res, next) {
    let categories = await categoryCotroller.getListCategories();
    res.render("new-category", { categories, title: "Add Category" });
  });
  
  router.post("/add-category", async function (req, res, next) {
    // req.body = {...req.body, avatar: 'assets/images/' + req.file.originalname}
    let { body } = req;
    // if (req.file) {
    //   let imgUrl =
    //     req.protocol +
    //     "://" +
    //     req.headers.host +
    //     "/assets/images/" +
    //     req.file.originalname;
    //   body = { ...body, avatar: imgUrl };
    // }
    await categoryCotroller.addCategory(body, res);
    // res.redirect("/category");
  });

  module.exports = router;