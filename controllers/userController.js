var userServices = require("../services/userServices");
var userModel = require ("../models/userModel");
exports.getListUser = async function getListUser() {
  return await userServices.getListUser();
};

exports.getUserById = async function getUserById(id) {
  return await userServices.getUserById(id);
};

exports.addNew = async function addNewUser(params, res) {
  let { userName, password } = params;
  const modelUser = new userModel({
    userName: userName,
    password: password,
  })
  // Tạo mới một sản phẩm
  await userServices.addNew(modelUser, res);
};

exports.edit = async function editUser(id, params) {
  let { userName, password } = params;
  let users = {
    id,
    userName,
    password,

  };
  await userServices.edit(users);
};

// exports.remove = function removeProductById(id) {
//   userServices.remove(id);
// };
