var express = require("express");
var router = express.Router();
var auth = require("../utilities/authen");
var upload = require("../utilities/upload");
var classCotroller = require("../controllers/classCotroller");
var categoryCotroller = require("../controllers/categoryController");
var middle = [auth.authenticate, upload.single("avatar")];

router.get("/", middle, async function (req, res, next) {
  let list = await classCotroller.getListClass();
  res.render("class", { listTable: list, title: "Home" });
});


router.get("/add-class", async function (req, res, next) {
  let classRoom = await categoryCotroller.getListCategories();
  res.render("add-new", { classRoom, title: "Adding" });
});

router.post("/add-class", middle, async function (req, res, next) {
  // req.body = {...req.body, avatar: 'assets/images/' + req.file.originalname}
  let { body } = req;
  if (req.file) {
    let imgUrl =
      req.protocol +
      "://" +
      req.headers.host +
      "/assets/images/" +
      req.file.originalname;
    body = { ...body, avatar: imgUrl };
  }
  await classCotroller.addNew(body, res);
  // res.redirect("/class");
});

// Set data từ form
router.get(
  "/edit-class/:id",
  auth.authenticate,
  async function (req, res, next) {
    let id = req.params.id;
    let cla = await classCotroller.getClassById(id);
    let classRoom = await categoryCotroller.getListCategories();
    res.render("edit-class", { class: cla, classRoom, title: "Editing" });
  }
);

// Hàm chỉnh sửa
router.post("/edit-class/:id", middle, async function (req, res, next) {
  let { id } = req.params;
  let { body } = req;
  if (req.file) {
    let imgUrl =
      req.protocol +
      "://" +
      req.headers.host +
      "/assets/images/" +
      req.file.originalname;
    body = { ...body, avatar: imgUrl };
  }
  await classCotroller.edit(id, body);
  res.redirect("/class");
});
// Delete
router.delete(
  "/delete/:id",
  auth.authenticate,
  async function (req, res, next) {
    let id = req.params.id;
    await classCotroller.remove(id);
    res.send({ res: true });
  }
);

module.exports = router;
