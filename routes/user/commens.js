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
    const { id_product, id_user } = body;
    let comments;
    comments = await commentModel
      .find({ id_product: id_product })
      .sort({ date: -1 })
      .populate({ path: "id_user" });
    res.status(200).json({ status: 1, data: comments });
  } catch (error) {
    res.status(200).json({ status: -1, error: error });
  }
});
router.post("/add", async function (req, res, next) {
  let { body } = req;
  const { content, image, id_product, id_user, rate } = body;
  if ((content, id_product, rate !== null)) {
    console.log(body);
    const coment = new commentModel({
      content: content,
      image: image !== undefined ? image : null,
      id_product: id_product,
      id_user: id_user,
      date: new Date(),
      rate: rate,
    });
    const like = await coment.save();
    res.status(200).json(like);
  }
});
router.get("/averaged/:idProduct", async function (req, res, next) {
  const { idProduct } = req.params;
  if (idProduct !== null) {
    let result = [];
    const comments = await commentModel
      .find({
        id_product: idProduct,
      })
      .count();
    var avd = 0;
    for (var i = 1; i < 6; i++) {
      const comment = await commentModel
        .find({
          id_product: idProduct,
          rate: i,
        })
        .count();
      let item;
      item = { count: comment, start: i };
      if (comment !== 0) {
        avd = avd + comment * i;
      }
      result.push(item);
    }
    res.status(200).json({
      status: 1,
      data: { comments: comments, avd: avd / comments, data: result },
    });
  } else {
    res.status(200).json({ status: -1, error: "Không tìm thấy dữ liệu" });
  }
});
module.exports = router;
