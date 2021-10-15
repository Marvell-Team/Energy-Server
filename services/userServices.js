
var UserModel = require("../models/userModel");

const userModel = require("../models/userModel");


exports.getListUser = async function getListUser() {
  let userr = await UserModel.find();

  return userr;
};

exports.getUserById = async function getUserById(id) {
  let userr = await UserModel.findById(id);
  // usert = { ...usert, id: usert._id };
  return userr;
};

exports.addNew = async function addNewUser(users, res) {
  let saveServices = await users.save();
  if(saveServices){
    res.redirect("/user");
  }
};

exports.edit = async function editUser(users) {
  let userEdit = await userModel.findById(users.id)
  console.log('tgtgtg',userEdit);
  if(userEdit){
    userEdit.userName = users.userName;
    userEdit.password = users.password;


  }
  await userEdit.save()
};

// exports.remove = async function removeUserById(id) {
//   let userRemove = await userModel.findByIdAndRemove(id)
//   return await userRemove;
// };
