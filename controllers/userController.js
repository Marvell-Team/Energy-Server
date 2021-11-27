var userServices = require("../services/userServices");
var userModel = require ("../models/userModel");
exports.getListUser = async function getListUser() {
  return await userServices.getListUser();
};

exports.getUserById = async function getUserById(id) {
  return await userServices.getUserById(id);
};

exports.addNew = async function addNewUser(params, res) {
  let { email_user, pwd_user,name_user } = params;
  if(email_user===undefined || pwd_user===undefined || name_user===undefined){
    return {status:-1,message:'Không tìm thấy dữ liệu truyền vào'}
  }else{
    const modelUser = new userModel({
      email_user: email_user,
      name_user: name_user,
      pwd_user:pwd_user,
      phone_user:null,
      address_user:'',
      avt_user:'',
      gender_user:'',
      born_day:null,
      active : true
    })
    // Tạo mới một sản phẩm
  return await userServices.addNew(modelUser, res);
  }
  
  
};
exports.blockUser = async function blockUserById(id) {
  return await userServices.blockUserById(id);
};

exports.login = async function loginUser( params) {
  let { email_user,pwd_user } = params;
  let users = {
    email_user,
    pwd_user
  };
  return await userServices.login(users);
};
exports.edit = async function editUser(id, params) {
  let { email_user, name_user,phone_user,address_user,avt_user,gender_user,born_day } = params;
  console.log(id+"id"+email_user)
  let users = {
    id,
    email_user,
    name_user,
    phone_user,
    address_user,
    avt_user,
    gender_user,
    born_day

  };
  return await userServices.edit(users);
};

// exports.remove = function removeProductById(id) {
//   userServices.remove(id);
// };
