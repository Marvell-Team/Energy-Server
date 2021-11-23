var express = require('express');
var router = express.Router();
var billController = require("../../controllers/billController")
var auth = require("../../utilities/authen");
var middle = [auth.authenToken];

router.post("/",middle, async function (req, res, next) {
    let { body } = req;
    console.log(body);
    const bill= await billController.addBill( body);
    res.status(200).json(bill);
});

router.post("/billdetails",middle, async function (req, res, next) {
    let { body } = req;
    console.log(body);
    const bill= await billController.getBillByUser( body);
    res.status(200).json(bill);
});
router.get("/billdetails/:id",middle, async function (req, res, next) {
    let { id } = req.params;
    const bill= await billController.getBillById( id);
    res.status(200).json(bill);
});
router.get("/bill/:total", async function (req, res, next) {
    let { total } = req.params;
    console.log(total);
    const bill= await billController.getBillByTotal( total);
    res.status(200).json(bill);
});

router.post("/payment/:id", async function (req, res, next) {
    let { id } = req.params;
    const bill= await billController.payment( id);
    res.status(200).json(bill);
});

router.get("/", async function (req, res, next) {
   
    const bill= await billController.getBill();
    res.status(200).json(bill);
});
module.exports = router;