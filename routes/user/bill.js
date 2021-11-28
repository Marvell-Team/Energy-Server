var express = require("express");
const moment = require("moment");
var router = express.Router();
var billController = require("../../controllers/billController");
const billModel = require("../../models/billModel");
var auth = require("../../utilities/authen");
var middle = [auth.authenToken];

router.post("/", middle, async function (req, res, next) {
  let { body } = req;
  console.log(body);
  const bill = await billController.addBill(body);
  res.status(200).json(bill);
});

router.post("/billdetails", middle, async function (req, res, next) {
  let { body } = req;
  console.log(body);
  const bill = await billController.getBillByUser(body);
  res.status(200).json(bill);
});
router.get("/billdetails/:id", middle, async function (req, res, next) {
  let { id } = req.params;
  const bill = await billController.getBillById(id);
  res.status(200).json(bill);
});

router.get("/billdetail/:id", async function (req, res, next) {
  let { id } = req.params;
  const bill = await billController.getBillById(id);
  res.status(200).json(bill);
});

router.get("/bill/:total", async function (req, res, next) {
  let { total } = req.params;
  console.log(total);
  const bill = await billController.getBillByTotal(total);
  res.status(200).json(bill);
});

router.post("/payment/:id", async function (req, res, next) {
  let { id } = req.params;
  const bill = await billController.payment(id);
  res.status(200).json(bill);
});

router.get("/", async function (req, res, next) {
  const bill = await billController.getBill();
  res.status(200).json(bill);
});

router.get("/date/:date", async function (req, res, next) {
  let { date } = req.params;
  let result;
  if(date==='day'){
    const today = moment().startOf('day')
    const bill=await billModel.find({
    "date_bill" : {
      "$gte": today.toDate(),
       "$lt" : moment(today).endOf('day').toDate()
    }
})
    result= {status:1,data:bill}
  }else if(date==='month'){
    const bill=await billModel.find({ "$expr": { "$eq": [{ "$month": "$date_bill" }, new Date().getMonth()+1] } })
    result= {status:1,data:bill}
  }else if(date==='year'){
    const bill=await billModel.find({ "$expr": { "$eq": [{ "$year": "$date_bill" }, new Date().getFullYear()] } })
    result= {status:1,data:bill}
  }else{
    result= {status:-1,data:'Có lỗi xảy ra'}
  }



   res.status(200).json(result);
});
module.exports = router;
