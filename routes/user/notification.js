var express = require("express");
const mongoose = require("mongoose");

var router = express.Router();
var likeController = require("../../controllers/likeController");
const notificationModel = require("../../models/notificationModel");

const userModel = require("../../models/userModel");
var auth = require("../../utilities/authen");
var middle = [auth.authenToken];

router.get("/:idUser", middle, async function (req, res, next) {
  const { idUser } = req.params;
  if (idUser !== null) {
    const noti = await notificationModel
      .find({ id_user: idUser })
      .populate({
        path: "id_billdetail",
        populate: {
          path: "products.id_product",
          populate: { path: "id_image" },
        },
      })
      .populate("id_user");
    res.status(200).json({ status: 1, data: noti });
  } else {
    res.status(200).json({ status: -1, error: "Không tìm thấy dữ liệu" });
  }
});

module.exports = router;
