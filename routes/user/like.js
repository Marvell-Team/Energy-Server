var express = require("express");
const mongoose = require("mongoose");

var router = express.Router();
var likeController = require("../../controllers/likeController");
const LikeModel = require("../../models/likeModel");
const userModel = require("../../models/userModel");
var auth = require("../../utilities/authen");
var middle = [auth.authenToken];

router.get("/", async function (req, res, next) {
  const cart = await LikeModel.find({id_user:"6189280c7e874d0c5463f356"}).populate({path:'id_product',populate :{path : 'id_image'}});
  // console.log(cart[0].liker.lenght)

  res.status(200).json(cart);
});
router.post("/status",middle, async function (req, res, next) {
  let { body } = req;
    console.log(body);
    const like= await likeController.statusLike( body);
    res.status(200).json(like);
});

router.get("/:id",middle ,async function (req, res, next) {
  let { id } = req.params;
  const user=await userModel.findById(id);
  if(user){
   
  const cart = await LikeModel.find({id_user:id}).populate({path:'id_product',populate :{path : 'id_image'}});
  // console.log(cart[0].liker.lenght)
  res.status(200).json({status:1,data:cart});
  }else{
    res.status(200).json({status:-1,error:"Khong tim thay du lieu"});
  }
  
});

router.post("/liker",middle, async function (req, res, next) {
  let { body } = req;
    console.log(body);
    const like= await likeController.addLiker( body);
    res.status(200).json(like);
});


router.get("/pr", async function (req, res, next) {
  const like = await LikeModel.find({id_product:'619538c00ffc292a88fe2723'});
  res.status(200).json(like.length);
});
router.get("/removeLike/:id", middle , async function (req, res, next) {
  const {id}= req.params;
  console.log(id)
  const like= await likeController.removelike( id);
  res.status(200).json(like);
});

module.exports = router;
