var express = require("express");
const moment = require("moment");
var router = express.Router();
var billController = require("../../controllers/billController");
const billModel = require("../../models/billModel");
var auth = require("../../utilities/authen");
const billdetailModel = require("../../models/billdetailModel");
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

router.get("/month", async function (req, res, next) {
  try {
    let result = [];
    for (var i = 1; i < 13; i++) {
      const bill = await billdetailModel.aggregate([
        {
          $lookup: {
            from: "bills", // name of the foreign collection
            let: { id_bill: "$id_bill" },
            as: "id_bill",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: [{ $month: "$date_bill" }, i] },
                      { $eq: ["$_id", "$$id_bill"] },
                      {
                        $eq: [
                          { $year: "$date_bill" },
                          new Date().getFullYear(),
                        ],
                      },
                      //      { $eq: ['$CompanyName', 'edt5'] },
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          $match: {
            id_bill: {
              $exists: true,
              $ne: [],
            },
            status: true,
          },
        },
        {
          $group: {
            _id: i,
            sum: { $sum: "$total" },
            amount: {
              $sum: { $size: "$products" },
            },
          },
        },
      ]);
      console.log(bill);
      let item = [];
      var month;
      if (i === 1) {
        month = "Jan";
      }
      if (i === 2) {
        month = "Feb";
      }
      if (i === 3) {
        month = "Mar";
      }
      if (i === 4) {
        month = "Apr";
      }
      if (i === 5) {
        month = "May";
      }
      if (i === 6) {
        month = "Jun";
      }
      if (i === 7) {
        month = "Jul";
      }
      if (i === 8) {
        month = "Agu";
      }
      if (i === 9) {
        month = "Sep";
      }
      if (i === 10) {
        month = "Oct";
      }
      if (i === 11) {
        month = "Nov";
      }
      if (i === 12) {
        month = "Dec";
      }
      if (Array.isArray(bill) && bill.length) {
        item = { month: month, total: bill[0].sum };
      } else {
        item = { month: month, total: 0 };
      }
      result.push(item);
    }

    res.status(200).json({ status: 1, data: result });
  } catch (error) {
    res.status(200).json({ status: -1, error: "Có lỗi xảy ra" });
  }
});
module.exports = router;
