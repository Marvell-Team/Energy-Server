var express = require("express");
const mongoose = require("mongoose");

var router = express.Router();
var cartController = require("../../controllers/cartController");
const LikeModel = require("../../models/likeModel");
var auth = require("../../utilities/authen");
var middle = [auth.authenToken];

router.get("/", async function (req, res, next) {
  // likeModel.find({ $size: "$liker" });
  // const cart= await LikeModel.
  // let cart = await LikeModel.aggregate([{$project: { count: { $size:"$liker" }}}])
  //   const cart= await LikeModel.aggregate([
  //     { $match : { id_product :ObjectId("618556075819363124b19ddf") }}
  //   ,
  //   {

  //     $project: {
  //       liker:1,
  //     id_product:1, count: { $size:"$liker" }}}
  // ])
  const cart = await LikeModel.find().sort({countLiker:1}).populate({path:'id_product',populate :{path : 'id_image'}});
  // console.log(cart[0].liker.lenght)

  res.status(200).json(cart);
});
router.get("/us", async function (req, res, next) {
  const cart = await LikeModel.find({ liker : { $in : ['6189280c7e874d0c5463f356'] } }).populate({path:'id_product',populate :{path : 'id_image'}});
  // console.log(cart[0].liker.lenght)

  res.status(200).json(cart);
});

router.get("/liker", async function (req, res, next) {
  const like = await LikeModel.findById("619539a1b2e09f0e583d9668");
  try {
    if (like) {
      like.liker = [{ id_user: "6189280c7e874d0c5463f356" }];
    }
    await like.save();
    return { status: 1, data: like };
  } catch (error) {
    return { status: -1, error: error };
  }
});

module.exports = router;
