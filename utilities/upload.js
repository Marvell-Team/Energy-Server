const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/images/");
  },
  filename: function (req, file, cb) {
    urlImage =file.fieldname + '-' + Date.now()+'.jpg';
    cb(null, urlImage);
  }
});
const fileFilter =(req, file, cb) =>{
  if(file.mimetype === 'image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png')
  cb(null, true)
  else
  cb(null, false)

 
}
module.exports = multer({
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter:fileFilter
});
