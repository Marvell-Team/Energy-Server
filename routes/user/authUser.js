var express = require("express");
var router = express.Router();
var userController = require("../../controllers/userController");
const userModel = require("../../models/userModel");
const otpModel = require("../../models/otpModel");
const config = require("../../utilities/config");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const client = require("twilio")(config.accountSID, config.authToken);
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
const nodemailer = require("nodemailer");

router.post("/login", async (req, res) => {
  let { body } = req;
  console.log("aa");
  let users = await userController.login(body);
  res.json(users);
});

//register
router.post("/", async function (req, res, next) {
  let { body } = req;
  let users = await userController.addNew(body, res);
  if (users.status === 1) {
    res.status(200).json(users);
  } else {
    res.status(404).json(users);
  }
});
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
        sendDigits: "a",
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
      console.log(phone);
      client.verify
        .services(config.serviceID)
        .verifications.create({
          to: `+84${user?.phone_user}`,
          channel: "sms",
        })
        .then((data) => {
          res.status(200).json({ status: 1, data: data });
        })
        .catch((error) => {
          res.status(404).json({ status: -1, error: error });
        });
    }
  } else {
    res.status(404).json({ status: -1, error: "Không tìm thấy người dùng" });
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

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.get("/Email/:email", async (req, res) => {
  const { email } = req.params;
  var OTP = Math.floor(100000 + Math.random() * 900000);
  const user = await userModel.findOne({
    email_user: email,
  });

  if (user) {
    try {
      const otp = new otpModel({ email: email, otp: OTP });
      const salt = await bcrypt.genSalt(10);
      otp.otp = await bcrypt.hash(otp.otp, salt);
      await otp.save().then(async () => {
        var mailOptions = {
          from: '"Energy Moblie 👻" <namsdai2@gmail.com>',
          to: email,
          subject: "Fogot PassWord For App Energy Moblie",
          html:
            "<h3>OTP for account verification is </h3>" +
            "<h1 style='font-weight:bold;'>" +
            OTP +
            "</h1>", // html body
        };
        const sendEM = await transporter.sendMail(
          mailOptions,
          (error, info) => {
            if (error) {
              res.status(200).json({ status: -1, error: error });
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            res.status(200).json({ status: 1, data: info });
          }
        );
      });
    } catch (error) {
      res.status(200).json({ status: 1, data: "aa" });
    }
    // send mail with defined transport object
  } else {
    res.status(400).json({ status: -1, error: "Không tìm thấy người dùng" });
  }
});

router.post("/Email/verify", async (req, res) => {
  const { email, code } = req.body;
  const otpHolder = await otpModel.find({
    email: email,
  });
  if (otpHolder.length === 0) {
    res.status(400).json({ status: -1, error: "Code đã hết hạn" });
  } else {
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(code, rightOtpFind.otp);
    if (rightOtpFind.email === email && validUser) {
      const OTPDelete = await otpModel.deleteMany({
        email: rightOtpFind.email,
      });
      const user = await userModel.findOne({ email_user: email });
      res.status(200).json({ status: 1, data: user });
    } else {
      res.status(400).json({ status: -1, error: "Sai code" });
    }
  }
});

module.exports = router;
