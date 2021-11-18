var express = require("express");
const mongoose = require("mongoose");

var router = express.Router();
var likeController = require("../../controllers/likeController");
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
  const cart = await LikeModel.find({id_user:"6189280c7e874d0c5463f356"}).populate({path:'id_product',populate :{path : 'id_image'}});
  // console.log(cart[0].liker.lenght)

  res.status(200).json(cart);
});
router.get("/lier", async function (req, res, next) {
  const cart = await LikeModel.find({ liker : { $in : ['6189280c7e874d0c5463f356'] } }).populate({path:'id_product',populate :{path : 'id_image'}});
  // console.log(cart[0].liker.lenght)

  res.status(200).json(cart);
});
router.post("/liker", async function (req, res, next) {
  let { body } = req;
    console.log(body);
    const like= await likeController.addLiker( body);
    res.status(200).json(like);
});


router.get("/pr", async function (req, res, next) {
  const like = await LikeModel.find({id_product:'619538c00ffc292a88fe2723'});
  res.status(200).json(like.length);
});

module.exports = router;
