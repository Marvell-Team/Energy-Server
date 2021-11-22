var express = require("express");
const mongoose = require("mongoose");

var router = express.Router();
var likeController = require("../../controllers/likeController");
const commentModel = require("../../models/commentModel");
const LikeModel = require("../../models/likeModel");
var auth = require("../../utilities/authen");
var middle = [auth.authenToken];

router.post("/", async function (req, res, next) {
    try {
      let { body } = req;
    const {id_product,id_user}=body;
    let comments;
    comments= await commentModel.find({id_product:id_product}).sort({date: -1}).populate({path:'id_user'});
  res.status(200).json({status:1,data:comments});
    } catch (error) {
      res.status(200).json({status:-1,error:error});
    }
});
router.post("/add", async function (req, res, next) {
  let { body } = req;
  const {content,image,id_product,id_user}= body;
    console.log(body);
    const coment=new commentModel({
        content: content,
        image: image==!undefined?image:null,
        id_product:id_product,
        id_user:id_user,
        date:new Date()
    })
    const like=await coment.save();
    res.status(200).json(like);
});


module.exports = router;
