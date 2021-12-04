var express = require("express");
var router = express.Router();
var storeController = require("../../controllers/storeController");
var auth = require("../../utilities/authen");
var middle = [auth.authenToken];

router.post("/", async function (req, res, next) {
  let { body } = req;
  console.log(body);
  const store = await storeController.AddStore(body);
  res.status(200).json(store);
});
router.post("/edit/:id", async function (req, res, next) {
  let { body } = req;
  const { id } = req.params;
  console.log(body);
  const store = await storeController.EditStore(body, id);
  res.status(200).json(store);
});

router.get("/", async function (req, res, next) {
  const store = await storeController.getStore();
  res.status(200).json(store);
});
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  const store = await storeController.getStoreById(id);
  res.status(200).json(store);
});

module.exports = router;
