
var UserModel = require("../models/userModel");

const userModel = require("../models/userModel");
var jwt = require('jsonwebtoken');

exports.login = async function login(users) {
  const {email_user,pwd_user}=users;
  let user=await UserModel.find({email_user:email_user,pwd_user:pwd_user}).exec().then(data=>{
    
    if(!(Array.isArray(data) && !data.length)){
      const {_id,email_user, name_user,phone_user,address_user,avt_user}=data[0];
      const accesToken = jwt.sign({id:_id},process.env.JWT_KEY);
      return{status:1,data:{accesToken:accesToken,id:_id,email_user:email_user,name_user:name_user,phone_user:phone_user,address_user:address_user,avt_user:avt_user}};
    }else{
      return{status:-1,message:"Khong tim thay du lieu"};
    }
  }).catch(err =>{
    return {status:-1,message:err};
  });
  return user;
};

exports.getListUser = async function getListUser() {
  let userr = await UserModel.find();

  return userr;
};

exports.getUserById = async function getUserById(id) {
  let userr = await UserModel.findById(id);
  // usert = { ...usert, id: usert._id };
  console.log(id)
  return userr;
};

exports.addNew = async function addNewUser(users, res) {
  let saveServices = await users.save().then(data => {
    return {status:1,data:{email_user:data.email_user,name_user:data.name_user,phone_user:data.phone_user,address_user:data.address_user,avt_user:data.avt_user}};
  }).catch(err =>{
    return {status:-1,message:err};
  });
  return saveServices;
  
};

exports.edit = async function editUser(usersEdit) {
  let user = await userModel.findById(usersEdit.id);
  const {id,email_user,name_user,phone_user,address_user,avt_user}=usersEdit;
  console.log('tgtgtg',user);
  if(user){
    // const users = await UserModel.updateOne(
    //   {_id:id},
    //   {$set : 
    //     { 
    //     email_user : email_user!==undefined?(email_user):(user.email_user),
    //     name_user : name_user!==undefined?(name_user):(user.name_user),
    //     phone_user : phone_user!==undefined?(phone_user):(user.phone_user),
    //     address_user : address_user!==undefined?(address_user):(user.address_user),
    //     avt_user : avt_user!==undefined?(avt_user):(user.avt_user),
    //   }},
    // )  
    user.email_user=email_user!==undefined?(email_user):(user.email_user);
    user.name_user=name_user!==undefined?(name_user):(user.name_user);
    user.phone_user= phone_user!==undefined?(phone_user):(user.phone_user);
    user.address_user=address_user!==undefined?(address_user):(user.address_user);
    user.avt_user=avt_user!==undefined?(avt_user):(user.avt_user);
  }
  await user.save();
  return {status:1,data:{email_user:user.email_user,name_user:user.name_user,phone_user:user.phone_user,address_user:user.address_user,avt_user:user.avt_user}}
};

// exports.remove = async function removeUserById(id) {
//   let userRemove = await userModel.findByIdAndRemove(id)
//   return await userRemove;
// };
