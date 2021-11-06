var express = require('express');
var router = express.Router();
var categoriesController = require("../../controllers/categoryController")
router.get("/", async  (req, res, next) => {
    let { id } = req;
    let users = await categoriesController.getListCategoriesbyCategorys();
    res.status(200).json(users);
  
  });