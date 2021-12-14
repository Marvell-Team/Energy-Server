var express = require("express");
var router = express.Router();
var userController = require("../../controllers/userController");
const userModel = require("../../models/userModel");
const config = require("../../utilities/config");
const client = require("twilio")(config.accountSID, config.authToken);
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/login", async (req, res) => {
  let { body } = req;
  console.log("aa");
  let users = await userController.login(body);
  res.json(users);
});

//register

//tao User
router.get("/admin/:id", async function (req, res, next) {
  let { id } = req.params;
  console.log(id + "id");
  let users = await userController.getUserById(id);
  if (users.status === 1) {
    res.status(200).json(users);
  } else {
    res.status(404).json(users);
  }
});

router.get("/PhoneOTP/:phone", async (req, res) => {
  const { phone } = req.params;
  const user = await userModel.findOne({ phone_user: phone });
  if (user) {
    res.status(404).json({ status: -1, error: "Số điện thoại này đã sử dụng" });
  } else {
    client.verify
      .services(config.serviceID)
      .verifications.create({
        to: `+84${phone}`,
        channel: "sms",
      })
      .then((data) => {
        res.status(200).json(data);
      });
  }
});
router.post("/verifyRegister", async (req, res) => {
  const { code, phoneNumber } = req.body;
  client.verify
    .services(config.serviceID)
    .verificationChecks.create({
      to: `+84${phoneNumber}`,
      code: code,
    })
    .then((data) => {
      if (data.valid) {
        res.status(200).json({ status: 1, data: data });
      } else {
        res
          .status(404)
          .json({ status: -1, error: "Code sai .Xin vui lòng nhập lại" });
      }
    })
    .catch((error) => {
      res.status(404).json({ status: -1, error: "Code đã quá hạn" });
    });
});

router.get("/forgotPWD/:phone", async (req, res) => {
  const { phone } = req.params;
  const user = await userModel.findOne({ phone_user: phone });
  if (user) {
    if (user.phone_user !== null) {
      client.verify
        .services(config.serviceID)
        .verifications.create({
          to: `+84${user?.phone_user}`,
          channel: "sms",
        })
        .then((data) => {
          res.status(200).json({ status: 1, data: data });
        });
    }
  } else {
    res.status(200).json({ status: -1, error: "Không tìm thấy người dùng" });
  }
});

router.post("/verify", async (req, res) => {
  const { code, phoneNumber } = req.body;
  const user = await userModel.findOne({ phone_user: phoneNumber });
  console.log(phoneNumber);
  client.verify
    .services(config.serviceID)
    .verificationChecks.create({
      to: `+84${phoneNumber}`,
      code: code,
    })
    .then((data) => {
      if (data.valid) {
        res.status(200).json({ status: 1, data: user });
      } else {
        res
          .status(404)
          .json({ status: -1, error: "Code sai .Xin vui lòng nhập lại" });
      }
    })
    .catch((error) => {
      res.status(404).json({ status: -1, error: "Code đã quá hạn" });
    });
});
router.post("/resetPWD", async (req, res) => {
  try {
    const { newPassWord, id_user } = req.body;
    const user = await userModel.findById(id_user);
    user.pwd_user = newPassWord;
    await user.save();
    res.status(200).json({ status: 1, data: user });
  } catch (error) {
    res.status(404).json({ status: -1, error: "Có lỗi xảy ra" });
  }
});

module.exports = router;
