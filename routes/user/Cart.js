var express = require('express');
var router = express.Router();
var cartController = require("../../controllers/cartController")
var auth = require("../../utilities/authen");
var middle = [auth.authenToken];

router.post("/edit-cart/:id",middle, async function (req, res, next) {
    let { id } = req.params;
    let { body } = req;
    console.log(body);
    console.log(id+'aaa')
    const cart= await cartController.EditCart(id, body);
    console.log(cart);
    res.status(200).json(cart);
});


 router.get("/:id",middle, async function (req, res, next) {
    let { id } = req.params;
    const cart= await cartController.getCart( id);
    res.status(200).json(cart);
 });

module.exports = router;